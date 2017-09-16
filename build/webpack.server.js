const path = require("path");
const projectRoot = path.resolve(__dirname, "..");
const merge = require("webpack-merge");
var webpack = require('webpack');
const base = require("./webpack.base.js");

module.exports = merge(base, {
    // 此处告知 server bundle 使用 Node 风格导出模块(Node-style exports)
    target: "node",
    entry: path.join(projectRoot, "src/entry-server.js"),
    output: {
        libraryTarget: "commonjs2", 
        path: path.join(projectRoot, "dist"),
        filename: "bundle.server.js"
    }
});
