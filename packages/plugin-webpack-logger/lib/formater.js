// LIBRARIES
const chalk = require('chalk');
// UTILS
const getDeps = require('./getDeps');

module.exports = async obj => {
    if (obj.type === 'MODULE_NOT_FOUND') {
        const { module, location, isFile } = obj;
        if (isFile) {
            return `Cannot import file ${chalk.green(`"${module}"`)} from ${chalk.green(`"${location}"`)}!`;
        }

        const { deps, dev } = getDeps(module);
        const command = 'install';
        const devFlag = ' --save-dev';
        const depFlag = ' --save';

        return `Cannot find module ${chalk.green(`"${module}"`)} in ${chalk.green(
            `"${location}"`,
        )}!\nYou may run ${chalk.cyan(
            `npm ${command} ${deps.join(' ')}${dev ? devFlag : depFlag}`,
        )} to install missing dependencies.${
            dev ? '' : `\nYou may also append${chalk.cyan(devFlag)} flag for devDependencies.`
        }`;
    }

    return obj.message;
};
