const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require("copy-webpack-plugin")

module.exports = (env, argv) => ({
    mode: 'development',
    devtool: argv.mode === 'production' ? false : 'inline-source-map',
    devServer: {
        contentBase: 'dist',
        watchContentBase: true,
        port: 3000
    },
    entry: {
        main: path.resolve(__dirname, './src/js/index.js'),
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        chunkFilename:
            argv.mode === 'production'
                ? '[name].[contenthash].js'
                : '[name].js',
        filename:
            argv.mode === 'production' ? '[name].[contenthash].js' : '[name].js'
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            inject: true,
            hash: false,
            template: path.resolve(__dirname, './index.html'),
            filename: 'index.html', // output file
        }),
        new CopyPlugin({
            patterns: [
                {from: "favicon.ico", to: "favicon.ico"},
                {from: "src/assets", to: "assets"}
            ],
        }),
    ],
    module: {
        rules: [
            // JavaScript
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            }
        ]
    },
});
