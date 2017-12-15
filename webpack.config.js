var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry : "./src/index.js",
    output : {
        path: path.resolve(__dirname, "build"),
        filename: "bundle.js",
        publicPath: ""
    },
    module : {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: "babel-loader"
            },
            {
                test: /\.sass/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use:["css-loader", "sass-loader"]
                })
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name : 'assets/[name].[ext]'
                        }
                    },
                    'img-loader'
                ]
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                loader: 'file-loader?name=assets/fonts/[name].[ext]'
            }
        ]
    },
    plugins : [
        new HtmlWebpackPlugin({
          template: 'src/index.html'
        }),
        new ExtractTextPlugin("app.css")
    ]
}
