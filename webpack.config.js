const path =require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const { Template } = require('webpack'); It appeared automatically so I commented.

module.exports = {
    entry : ['babel-polyfill','./src/js/index.js'],
    output : {
        path : path.resolve(__dirname,'dist'),
        filename : 'js/bundle.js'
    },
    devServer : {
        static :'./dist'
    },
    plugins : [
        new HtmlWebpackPlugin({
            filename:'index.html',
            template:'./src/index.html'
        })
    ],
    module : {
        rules : [
            {
                test : /\.js$/,
                exclude : /node_modules/,
                use : {
                    loader: 'babel-loader'
                }
            }
        ]
    }
}