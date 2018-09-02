// LIBRARIES
const updateNotifier = require('update-notifier');
const cac = require('cac');
// COMPONENTS
const isPath = require('../lib/utils/isPath');
const TechpacketBuildTools = require('../lib');
// PACKAGES
const logger = require('../packages/logger');
// PACKAGE
const pkg = require('../package');

require('loud-rejection')();

updateNotifier({ pkg }).notify();

// To start, we will need to know which `command` you're calling
// And you can also supply options via CLI flags
const { input, flags } = cac.parse(process.argv.slice(2));

// Handle `--version` before starting
if (flags.version || flags.v) {
    logger.debug(require('../package').version);
    process.exit();
}

let command;
let entry;

if (!input[0] || isPath(input[0])) {
    command = 'develop';
    entry = input;
} else {
    command = input[0];
    entry = input.slice(1);
}

// Create options
const options = Object.assign({}, flags, { entry, flags });

if (entry.length === 0) {
    delete options.entry;
}

const app = new TechpacketBuildTools(command, options);

app.run().catch(err => {
    logger.error(err.stack);
    process.exit(1);
});
