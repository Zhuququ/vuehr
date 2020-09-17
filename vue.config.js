let proxyObj = {};

// 拦截的请求地址
proxyObj['/'] = {
    ws: false,// 把websocket关闭，会单独配置
    target: 'http://localhost:8081',// 将拦截的请求转发到target
    changeOrigin: true,
    pathRewrite: {
        '^/': ''// 拦截的地址不进行修改
    }
}

module.exports = {
    devServer: {
        host: 'localhost',
        port: 8080,
        proxy: proxyObj
    }
}