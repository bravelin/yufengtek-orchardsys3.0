module.exports = {
    publicPath: './',
    assetsDir: '',
    productionSourceMap: false,
    devServer: {
        port: 9001,
        https: false,
        hotOnly: false,
        disableHostCheck: true,
        proxy: {
            '/orchard': {
                target: 'http://trace.yufengtek.com',
                changeOrigin: true
            }
        }
    }
}
