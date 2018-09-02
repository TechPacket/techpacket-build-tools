module.exports = (ctx, { jsx = 'react' } = {}) => {
    const presets = [
        [
            require('@babel/preset-env').default,
            {
                useBuiltIns: false,
                modules: false,
                targets: {
                    ie: 9,
                },
            },
        ],
    ];

    const plugins = [
        [
            require.resolve('@babel/plugin-proposal-decorators'),
            {
                legacy: true,
            },
        ],
        [
            require.resolve('@babel/plugin-proposal-class-properties'),
            {
                loose: true,
            },
        ],
        [
            require.resolve('@babel/plugin-transform-runtime'),
            {
                helpers: false,
                regenerator: true,
            },
        ],
        require.resolve('@babel/plugin-proposal-object-rest-spread'),
        // For dynamic import that you will use a lot in code-split
        require.resolve('@babel/plugin-syntax-dynamic-import'),
    ];

    if (jsx === 'react') {
        plugins.push(require.resolve('@babel/plugin-transform-react-jsx'));
        plugins.push(require.resolve('babel-plugin-react-require'));
    } else {
        plugins.push([require.resolve('@babel/plugin-transform-react-jsx'), { pragma: jsx }]);
    }

    return {
        presets,
        plugins,
    };
};
