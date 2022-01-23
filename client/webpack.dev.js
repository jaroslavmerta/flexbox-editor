const path = require('path');
const common = require('./webpack.config');
const {merge} = require('webpack-merge');

module.exports = merge(common, {
    devtool: "eval-cheap-module-source-map",
    devServer: {
        contentBase: path.join(__dirname,"public"),
        compress: true,
        port: 8080
    }
})