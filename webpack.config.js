const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WriteFileWebpackPlugin = require('write-file-webpack-plugin');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: './src/index.html',
    hash: true,
    inject: 'body'
});

const extractSass = new ExtractTextPlugin('stylesheets/main.css');
const extractCss = new ExtractTextPlugin('stylesheets/vendors.css');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        contentBase: 'dist',
        open: true
    },
    module: {
        rules: [{
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
        },
            {
                test: /\.scss$/,
                use: extractSass.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
        },
            {
                test: /\.css$/,
                use: extractCss.extract({
                    fallback: 'style-loader',
                    use: ['css-loader']
                })
        },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: "url-loader?limit=10000&mimetype=application/font-woff"
        },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: "file-loader"
        },
            {
                test: /\.(jpg|gif|png)$/,
                use: "file-loader"
        }]
    },
    plugins: [
        // new CleanWebpackPlugin(['dist']),
        HtmlWebpackPluginConfig,
        extractCss,
        extractSass,
        new WriteFileWebpackPlugin(),
        new CopyWebpackPlugin([
            {
                from: 'src/images',
                to: 'images'
            }
        ])
    ]
}