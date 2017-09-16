const path = require("path");
const projectRoot = path.resolve(__dirname, "..");
var FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin");
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');
const Autoprefixer = require('autoprefixer');

var cssOption = {
    use: [
        'css-loader',
        'postcss-loader'
    ],
    fallback: 'vue-style-loader'
};
var lessOption = {
    use: [
        'css-loader',
        'postcss-loader',
        'less-loader'
    ],
    fallback: 'vue-style-loader'
};

var plugins = [
    new ExtractTextPlugin({
        filename: "[name].css",
        disable: false,
        allChunks: true
    }),    
    new webpack.LoaderOptionsPlugin({
        options: {
            postcss: [
                Autoprefixer({
                    browsers: ['> 1%']
                })
            ]
        }
    }),
    new FriendlyErrorsPlugin()
];

module.exports = {
    output: {
        path: path.join(projectRoot, "dist"),
        filename: "bundle.client.js"
    },
    module: {
        rules: [{
                test: /\.vue$/,
                loader: "vue-loader",
                exclude: /node_modules/,
                options: {
                    loaders: {
                        'css': ExtractTextPlugin.extract(cssOption),
                        'less': ExtractTextPlugin.extract(lessOption)
                    }
                }
            }, {
                test: /\.js$/,
                loader: "babel-loader",
                exclude: /node_modules/
            }, {
                test: /\.css$/,
                use: ExtractTextPlugin.extract(cssOption)
            }, {
                test: /\.woff|ttf|woff2|eot$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 100000
                    }
                }]
            }, {
                test: /\.less$/,
                use: ExtractTextPlugin.extract(lessOption)
            }, {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 25000
                    }
                }]
            }
        ]
    },
    plugins: plugins
};
