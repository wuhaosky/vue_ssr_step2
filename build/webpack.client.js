const path = require("path");
const projectRoot = path.resolve(__dirname, "..");
const merge = require("webpack-merge");
var webpack = require('webpack');
const base = require("./webpack.base.js");

module.exports = merge(base, {
    entry: path.join(projectRoot, "src/entry-client.js")
});
