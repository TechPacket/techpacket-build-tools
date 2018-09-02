module.exports = (config, filename) => {
    config.module
        .rule('font')
        .test(/\.(eot|otf|webp|ttf|woff|woff2)(\?.*)?$/)
        .use('file-loader')
        .loader(require.resolve('file-loader'))
        .options({
            name: filename.fonts,
        });
};
