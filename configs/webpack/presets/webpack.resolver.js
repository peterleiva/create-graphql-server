const path = require("path");

/**
 * @type {import("webpack").Configuration}
 */
module.exports = {
	resolve: {
		modules: [path.resolve(__dirname, "../../../src"), "node_modules"],
		extensions: [".wasm", ".mjs", ".js", ".json", ".ts", ".tsx"],
	},
};
