const BaseError = require('@techpacket-build-tools/errors');
const { cwd } = require('./dir');

let projectPkgCache;

function readProjectPkg() {
    try {
        projectPkgCache = projectPkgCache || require(cwd('package.json'));
        return projectPkgCache;
    } catch (err) {
        if (err.code === 'MODULE_NOT_FOUND') {
            return {};
        }
        throw new BaseError(err.message);
    }
}

module.exports = readProjectPkg;
