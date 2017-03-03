var htmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: './src/app.js',
    output: {
        path: './dist',
        filename: 'js/[name].bundle.js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: path.resolve(__dirname, 'node_modules'),
            include: path.resolve(__dirname, 'src'),
            loader: 'babel-loader'
        }, {
            test: /\.css$/,
            exclude: path.resolve(__dirname, 'node_modules'),
            loader: 'style-loader!css-loader?importLoaders=1!postcss-loader'
        }, {
            test: /\.scss$/,
            exclude: path.resolve(__dirname, 'node_modules'),
            loader: 'style-loader!css-loader!postcss-loader!sass-loader'
        }, {
            test: /\.less$/,
            exclude: path.resolve(__dirname, 'node_modules'),
            loader: 'style-loader!css-loader!postcss-loader!less-loader'
        }, {
            test: /\.html$/,
            exclude: path.resolve(__dirname, 'node_modules'),
            loader: 'html-loader'
        }, {
            test: /\.(jpg|png|gif|sev)$/,
            exclude: path.resolve(__dirname, 'node_modules'),
            loaders: [
                'url-loader?limit=500&name=assets/img-[hash:5].[ext]',
                'image-webpack-loader'
            ]
        }]
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: [
                    require('autoprefixer')({
                        broswers: ['last 2 version']
                    })
                ]
            }
        }),
        new htmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: 'body'
        })
    ]
}