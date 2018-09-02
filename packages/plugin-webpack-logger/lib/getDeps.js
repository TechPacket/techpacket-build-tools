const DEPS = {
    'graphql-tag/loader': {
        deps: ['graphql-tag'],
        dev: true,
    },
    'sass-loader': {
        deps: ['node-sass', 'sass-loader'],
        dev: true,
    },
    'stylus-loader': {
        deps: ['stylus', 'stylus-loader'],
        dev: true,
    },
    'bs-loader': {
        deps: ['bs-loader', 'bs-platform'],
        dev: true,
    },
    'bs-platform': {
        deps: ['bs-platform'],
        dev: true,
    },
};

module.exports = function(name) {
    return DEPS[name] || { deps: [name], dev: false };
};
