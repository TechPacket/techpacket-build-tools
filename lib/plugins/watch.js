module.exports = {
    name: 'builtin:watch',
    apply(techpacketBuildTools) {
        techpacketBuildTools.cli.handleCommand('watch', 'Run app in watch mode', () => {
            const compiler = techpacketBuildTools.createCompiler();
            const watcher = compiler.watch({}, err => {
                if (err) {
                    console.error(err);
                }
            });
            return {
                webpackWatcher: watcher,
            };
        });
    },
};
