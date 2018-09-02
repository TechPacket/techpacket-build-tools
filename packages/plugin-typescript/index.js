/**
 * Add TypeScript support
 * @name pluginTypescript
 * @param {Object} options
 * @param {any} [options.loaderOptions=undefined] - Options for ts-loader.
 * @param {any} [options.pluginOption=undefined] - Options for fork-ts-checker (https://www.npmjs.com/package/fork-ts-checker-webpack-plugin).
 */
module.exports = ({ loaderOptions, pluginOption } = {}) => {
    return {
        name: 'typescript',
        apply(techpacketBuildTools) {
            techpacketBuildTools.chainWebpack(config => {
                const tsRule = config.module.rule('typescript').test(/\.tsx?$/);
                tsRule
                    .use('ts-loader')
                    .loader(require.resolve('ts-loader'))
                    .options(loaderOptions);

                config.resolve.extensions.add('.ts').add('.tsx');

                config.plugin('fork-ts-checker').use(require('fork-ts-checker-webpack-plugin'), [
                    {
                        silent: true,
                        ...pluginOption,
                    },
                ]);

                config.resolve.plugin('tsconfig-paths').use(require('tsconfig-paths-webpack-plugin'));
            });
        },
    };
};
