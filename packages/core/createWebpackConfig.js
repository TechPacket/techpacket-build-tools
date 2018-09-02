// LIBRARIES
const yarnGlobal = require('yarn-global');
const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
// UTILS
const getFullEnvString = require('./utils/getFullEnvString');
const stringifyObject = require('./utils/stringifyObject');
const ownDir = require('./utils/ownDir');

exports.name = 'builtin:createWebpackConfig';

exports.apply = techpacketBuildTools => {
    const { command } = techpacketBuildTools;

    // TODO: Match in package.json
    const inWorkspace = __dirname.includes(path.normalize('/techpacket-build-tools/packages/'));
    // node_modules in @techpacket-build-tools/core/node_modules
    const ownNodeModules = inWorkspace ? ownDir('../../node_modules') : ownDir('node_modules');

    function setOutput(config) {
        config.output.merge({
            path: techpacketBuildTools.options.outDir,
            pathinfo: true,
            filename: techpacketBuildTools.options.filename.js,
            chunkFilename: techpacketBuildTools.options.filename.chunk,
            publicPath: techpacketBuildTools.options.publicPath,
        });
    }

    function setHMR(config) {
        const devClient = require.resolve('@techpacket-build-tools/dev-utils/hotDevClient');

        // Add hmr entry using `hotEntry` option
        if (techpacketBuildTools.options.hotReload) {
            config.plugin('hmr').use(webpack.HotModuleReplacementPlugin);
            config.plugin('named-modules').use(webpack.NamedModulesPlugin);
            for (const hotEntry of techpacketBuildTools.options.hotEntry) {
                if (config.entryPoints.has(hotEntry)) {
                    config.entry(hotEntry).prepend(devClient);
                }
            }
        }
    }

    function setPerformance(config) {
        config.performance.hints(false);
    }

    function setFormat(config) {
        if (techpacketBuildTools.options.format === 'cjs') {
            config.output.libraryTarget('commonjs2');
        } else if (techpacketBuildTools.options.format === 'umd') {
            config.output.libraryTarget('umd');
            config.output.library(techpacketBuildTools.options.moduleName);
        }
    }

    function setExternals(config) {
        config.externals(techpacketBuildTools.options.externals);
    }

    function setResolve(config) {
        config.resolve.symlinks(true);
        config.resolve.extensions
            .add('.js')
            .add('.jsx')
            .add('.json');
        config.resolve.modules
            .add(techpacketBuildTools.resolveCwd('node_modules'))
            .add('node_modules')
            .add(ownNodeModules);
        config.resolve.alias.set('@', techpacketBuildTools.resolveCwd('src'));
    }

    function setResolveLoader(config) {
        config.resolveLoader.set('symlinks', true);
        config.resolveLoader.modules
            .add(techpacketBuildTools.resolveCwd('node_modules'))
            .add('node_modules')
            .add(ownNodeModules);
    }

    function setCSSRules(config) {
        require('./rules/css')(config, techpacketBuildTools.options.css);
    }

    function setJSRules(config) {
        require('./rules/js')(config, techpacketBuildTools.options.babel);
    }

    function setImageRules(config) {
        require('./rules/image')(config, techpacketBuildTools.options);
    }

    function setFontRules(config) {
        require('./rules/font')(config, techpacketBuildTools.options.filename);
    }

    function setPlugins(config) {
        if (command === 'develop' || command === 'watch') {
            // config.plugin('timefix').use(require('time-fix-plugin'));
        }

        config
            .plugin('define')
            .use(webpack.DefinePlugin, [
                Object.assign(
                    {},
                    stringifyObject(getFullEnvString(techpacketBuildTools.env)),
                    techpacketBuildTools.options.define,
                ),
            ]);

        config.plugin('no-emit-on-errors').use(require('webpack/lib/NoEmitOnErrorsPlugin'));

        if (process.env.NODE_ENV !== 'test' && techpacketBuildTools.options.progress !== false) {
            if (techpacketBuildTools.options.progress === 'simple') {
                config.plugin('simple-progress').use(webpack.ProgressPlugin);
            } else {
                config.plugin('webpackbar').use(require('webpackbar'), [
                    {
                        name: '',
                        profile: techpacketBuildTools.options.profile,
                        compiledIn: false,
                        color: 'green',
                    },
                ]);
            }
        }

        if (process.env.NODE_ENV !== 'test') {
            config.plugin('plugin-webpack-logger').use(require('@techpacket-build-tools/plugin-webpack-logger'), [
                {
                    showFileStats: techpacketBuildTools.command === 'build',
                    logger: require('@techpacket-build-tools/logger'),
                    clearConsole: techpacketBuildTools.options.clearConsole,
                },
            ]);
        }
    }

    function setWatchMissingFiles(config) {
        if (command === 'develop' || command === 'watch') {
            config
                .plugin('watch-missing-node-modules')
                .use(require('./webpack/WatchMissingNodeModulesPlugin'), [
                    techpacketBuildTools.resolveCwd('node_modules'),
                ]);
        }
    }

    function setCopyFiles(config) {
        const { copy, staticFolder = 'static' } = techpacketBuildTools.options;

        if (copy !== false) {
            let copyOptions = [];
            if (fs.existsSync(techpacketBuildTools.resolveCwd(staticFolder))) {
                copyOptions.push({
                    from: techpacketBuildTools.resolveCwd(staticFolder),
                    to: '.',
                    ignore: ['.DS_Store', '.gitkeep'],
                });
            }
            if (typeof copy === 'object') {
                if (Array.isArray(copy)) {
                    copyOptions = copyOptions.concat(copy);
                } else {
                    copyOptions.push(copy);
                }
            }
            if (copyOptions.length > 0) {
                config.plugin('copy-static-files').use(require('copy-webpack-plugin'), [copyOptions]);
            }
        }
    }

    function setHTML(config) {
        let { html } = techpacketBuildTools.options;

        if (html && html.length > 0) {
            html.forEach((v, i) => {
                config.plugin(`html-${i}`).use(require('html-webpack-plugin'), [v]);
            });
        }
    }

    techpacketBuildTools.chainWebpack(config => {
        config.merge({
            mode: techpacketBuildTools.command === 'build' ? 'production' : 'development',
            entry: techpacketBuildTools.options.entry,
            devtool: techpacketBuildTools.options.sourceMap,
            optimization: {
                minimize: techpacketBuildTools.options.minimize,
                minimizer: [
                    {
                        apply(compiler) {
                            const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
                            new UglifyJsPlugin({
                                cache: true,
                                parallel: true,
                                sourceMap:
                                    techpacketBuildTools.options.sourceMap &&
                                    /source-?map/.test(techpacketBuildTools.options.sourceMap),
                                uglifyOptions: {
                                    output: {
                                        comments: false,
                                    },
                                    mangle: true,
                                },
                            }).apply(compiler);
                        },
                    },
                ],
                splitChunks: {
                    chunks:
                        techpacketBuildTools.options.format || techpacketBuildTools.command === 'test'
                            ? 'async'
                            : 'all',
                },
            },
        });

        function setGraphql(config) {
            require('./rules/graphql')(config);
        }

        function setReason(config) {
            require('./rules/reason')(config);
        }

        setOutput(config);
        setPerformance(config);
        setExternals(config);
        setResolve(config);
        setResolveLoader(config);
        setHMR(config);
        setFormat(config);
        setCSSRules(config);
        setJSRules(config);
        setImageRules(config);
        setFontRules(config);
        setPlugins(config);
        setWatchMissingFiles(config);
        setCopyFiles(config);
        setHTML(config);
        setGraphql(config);
        setReason(config);

        // installed by `yarn global add`
        if (yarnGlobal.inDirectory(__dirname)) {
            // modules in yarn global node_modules
            // because of yarn's flat node_modules structure
            config.resolve.modules.add(techpacketBuildTools.ownDir('..'));
            // loaders in yarn global node_modules
            config.resolveLoader.modules.add(techpacketBuildTools.ownDir('..'));
        }

        config.plugin('clean-out-dir').use(
            class CleanOutDir {
                apply(compiler) {
                    compiler.hooks.emit.tapPromise('clean-out-dir', async () => {
                        if (
                            techpacketBuildTools.options.cleanOutDir ||
                            /\[(chunk)?hash(:\d+)?\]/.test(compiler.options.output.filename)
                        ) {
                            await require('trash')([compiler.options.output.path]);
                        }
                    });
                }
            },
        );

        config.plugin('develop-logs').use(
            class DevelopLogs {
                apply(compiler) {
                    compiler.hooks.done.tap('develop-logs', stats => {
                        if (!stats.hasErrors() && !stats.hasWarnings()) {
                            techpacketBuildTools.emit('show-develop-logs');
                        }
                    });
                }
            },
        );
    });
};
