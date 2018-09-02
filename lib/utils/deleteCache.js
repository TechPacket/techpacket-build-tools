// LIBRARIES
const path = require('path');

function deleteCache() {
    delete require.cache[path.resolve('package.json')];
}

module.exports = deleteCache;
