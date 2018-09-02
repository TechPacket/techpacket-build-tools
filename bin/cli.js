#!/usr/bin/env node

// LIBRARIES
const importLocalFile = require('import-local-file');
// PACKAGES
const logger = require('../packages/logger');

const localFile = importLocalFile(__filename);
const forceGlobal = process.argv.includes('--force-global') || process.argv.includes('--forceGlobal');

if (localFile && !forceGlobal) {
    logger.debug('Using local build package', localFile);
    require(localFile);
} else {
    // Code for both global and local version
    require('./main');
}
