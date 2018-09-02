// LIBRARIES
const cac = require('cac');

module.exports = class CLI {
    constructor(command) {
        this.command = command;
        this.cac = cac();
    }

    handleCommand(...args) {
        return this.cac.command(...args);
    }

    isCurrentCommand(command) {
        if (command === '*' || command === this.command) return true;
        if (Array.isArray(command) && command.includes(this.command)) return true;
        return false;
    }

    willShowHelp() {
        return process.argv.includes('--help');
    }

    async runCommand() {
        const args = [this.command];

        if (this.willShowHelp()) {
            args.push('--help');
        }

        return this.cac.parse(args);
    }
};
