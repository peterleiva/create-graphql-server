const NodemonPlugin = require("nodemon-webpack-plugin");

/**
 * @param {object} [env]
 * @param {boolean} [env.clean = false]
 * @return {import("webpack").Configuration}
 */
module.exports = function () {
	return {
		mode: "development",
		devtool: "inline-source-map",

		plugins: [new NodemonPlugin()],
	};
};
