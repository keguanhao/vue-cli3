const path = require('path');
function resolve(dir) {
    return path.join(__dirname, dir)
}
module.exports = {
    lintOnSave: true,
    baseUrl: "/",
    // 输出目录
    outputDir: 'dist',
    lintOnSave: true,
    // 是否为生产环境构建生成 source map？
    productionSourceMap: false,
    // alias 配置
    chainWebpack: (config) => {
        config.resolve.alias
            .set('@', resolve('src'))
        config.module.rules.delete("svg");
        config.module
            .rule('svg-smart')
            .test(/\.svg$/)
            .include
            .add(resolve('./src/mall_admin/icons/svg'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: '[name]'
            })
    },
    devServer: {
        proxy: {
            // proxy all requests starting with /api to jsonplaceholder
            '/api': {
                target: 'http://www.jiouai.com:80', //代理接口
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '/api' //代理的路径
                },

            }
        }
    },

    css: {
        extract: false
    }

}