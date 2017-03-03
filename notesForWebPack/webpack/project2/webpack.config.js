var htmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: {
        bundle: './src/script/main.js',
        bundle2: './src/script/main2.js',
        bundle3: './src/script/main3.js'
    },
    output: {
        path: './dist',
        filename: '/js/[name]-[chunkhash].js',
        publicPath: 'http://cdn.com'
    },
    plugins: [
        new htmlWebpackPlugin({
            filename: 'index-[1].html',
            template: 'index.html',
            inject: false,
            title: 'this is a webpack project',
            chunks: ['bundle3', 'bundle'],
            minify: {
                removeComments: true,
            }
        }),
        new htmlWebpackPlugin({
            filename: 'index-[2].html',
            template: 'index.html',
            inject: false,
            chunks: ['bundle', 'bundle2'],
            title: 'this is a second html'
        }),
        new htmlWebpackPlugin({
            filename: 'index-[3].html',
            template: 'index.html',
            inject: false,
            chunks: ['bundle'],
            title: 'this is a third html'
        })
    ]
}