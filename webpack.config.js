const path = require("path");
const nodeExternals = require("webpack-node-externals");
const { organizer } = require("webpack-config-organizer");

/**
 * @param {object} [env]
 * @param {boolean} [env.clean = false]
 * @return {import("webpack").Configuration}
 */
module.exports = organizer(
	["typescript", "babel", "resolver"],
	({ clean = false }) => ({
		target: "node",
		externalsPresets: { node: true },
		externals: [nodeExternals()],

		context: path.resolve(__dirname, "src"),
		entry: "./main.ts",
		output: {
			filename: "[name].js",
			path: path.resolve(__dirname, "dist"),
			clean,
		},

		optimization: {
			runtimeChunk: "single",
		},
	})
);
