// LIBRARIES
const getPort = require('get-port');
const address = require('address');
const chalk = require('chalk');
const url = require('url');
const opn = require('opn');
// PACKAGES
const createDevServer = require('../../packages/core/createDevServer');
const logger = require('../../packages/logger');
// UTILS
const unspecifiedAddress = require('../utils/unspecifiedAddress');
const sharedCLIOptions = require('../utils/sharedCLIOptions');
const isPath = require('../utils/isPath');

module.exports = {
    name: 'builtin:develop',
    apply(techpacketBuildTools) {
        const command = techpacketBuildTools.cli.handleCommand(
            'develop',
            {
                desc: 'Run app in development mode',
                match(name) {
                    return !name || isPath(name);
                },
            },
            async () => {
                const compiler = techpacketBuildTools.createCompiler();

                const devServerOptions = Object.assign(
                    {
                        hot: techpacketBuildTools.options.hotReload !== false,
                        publicPath: compiler.options.output.publicPath,
                        historyApiFallback: true,
                        disableHostCheck: true,
                        overlay: true,
                        quiet: true,
                    },
                    techpacketBuildTools.options.devServer,
                    compiler.options.devServer,
                );

                const host = techpacketBuildTools.options.devServer.host;
                const port = await getPort({ port: techpacketBuildTools.options.devServer.port, host });

                if (port !== techpacketBuildTools.options.devServer.port) {
                    logger.warn(
                        `Port ${techpacketBuildTools.options.devServer.port} has been used, switched to ${port}.`,
                    );
                }

                const server = createDevServer(compiler, devServerOptions);
                const protocol = devServerOptions.https ? 'https' : 'http';

                server.listen(port, host);

                let lanIP;
                let opened;

                techpacketBuildTools.on('show-develop-logs', () => {
                    let msg = `\n  ${chalk.green('App running at:')}`;
                    const isUnspecifiedAddress = unspecifiedAddress(host);

                    const localURL = url.format({
                        protocol,
                        hostname: isUnspecifiedAddress ? 'localhost' : host,
                        port,
                    });

                    msg += `\n${chalk.bold(`  - Local:           ${localURL}`)}`;

                    if (isUnspecifiedAddress) {
                        const lanURL = url.format({
                            protocol,
                            hostname: lanIP || (lanIP = address.ip()),
                            port,
                        });
                        msg += `\n${chalk.dim(`  - On Your Network: ${lanURL}`)}`;
                    }

                    logger.log(`${msg}\n`);

                    if (techpacketBuildTools.options.open && !opened) {
                        opened = true;
                        opn(
                            url.format({
                                protocol,
                                hostname: unspecifiedAddress(host) ? 'localhost' : host,
                                port,
                            }),
                        );
                    }
                });

                return {
                    devServer: server,
                };
            },
        );

        sharedCLIOptions(command);

        command
            .option('host', {
                desc: 'Server host',
            })
            .option('port', {
                desc: 'Server port',
            });
    },
};
