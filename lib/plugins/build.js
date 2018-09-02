// OPTIONS
const sharedCLIOptions = require('../utils/sharedCLIOptions');

module.exports = {
    name: 'builtin:build',
    apply(techpacketBuildTools) {
        const next = () => techpacketBuildTools.runCompiler();

        sharedCLIOptions(techpacketBuildTools.cli.handleCommand('build', 'Build app in production mode', next));
    },
};
