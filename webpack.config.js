const path = require('path');
// Plugin
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// Webpack configuration
module.exports = {
    entry: {
        app: './dev_client/App.js',
    },
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: './js/app.bundle.js'
    },
    devtool: 'source-map',
    // Loaders configuration
    module: {
        rules: [{
            test: /\.html$/,
            loader: [
                'html-loader'
            ]
        }, {
            test: /\.js$/,
            exclude: /node_modules/,
            use: [
                'babel-loader'
            ],
        }, {
            test: /\.less$/,
            use: ExtractTextPlugin.extract({
                use: [
                    'css-loader', 'less-loader'
                ],
            })
        }, {
            test: /\.(png|svg|jpg|gif)$/,
            use: {
                loader: 'file-loader',
                options: {
                    publicPath: '../',
                    name: './images/[name].[ext]'
                }
            },
        }, {
            test: /\.(woff|woff2|eot|ttf|otf)$/,
            use: {
                loader: 'file-loader',
                options: {
                    publicPath: '../',
                    name: './fonts/[name].[ext]'
                }
            },
        }, ]
    },
    plugins: [
/*        new HtmlWebpackPlugin({
            template: './index.html'
        }),*/
        new ExtractTextPlugin({
            filename: './css/app.bundle.css'
        }),
    ],
    // Enable autoimporting of .js files, e.g. import MyComponent from './my-component';
    resolve: {
        extensions: ['.js', '.jsx'],
    },
};