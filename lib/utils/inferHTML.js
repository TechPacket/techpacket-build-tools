// LIBRARIES
const fs = require('fs');
const path = require('path');
// UTILS
const { ownDir } = require('./dir');
const readProjectPkg = require('./readProjectPkg');
// PACKAGES
const logger = require('../../packages/logger');

function inferHTML(options = {}) {
    const pkg = readProjectPkg();
    const result = {
        pkg,
        title: pkg.productName || pkg.name || 'App',
        description: pkg.description,
        template: ownDir('lib/templates/html.ejs'),
    };

    const templatePath = path.resolve(options.templatePath || process.cwd(), 'index.ejs');

    if (fs.existsSync(templatePath)) {
        logger.debug(`HTML template file`, templatePath);
        result.template = templatePath;
    }

    return result;
}

module.exports = inferHTML;
