const path = require("path");
const projectRoot = path.resolve(__dirname, "..");

module.exports = {
    entry: path.join(projectRoot, "src/entry-client.js"),
    output: {
        path: path.join(projectRoot, "dist"),
        filename: "bundle.client.js"
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: "vue-loader",
                exclude: /node_modules/
            },
            {
                test: /\.js$/,
                loader: "babel-loader",
                exclude: /node_modules/
            }
        ]
    }
};
