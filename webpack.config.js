const path = require("path");
const nodeExternals = require("webpack-node-externals");
const { BannerPlugin } = require("webpack");
const { organizer } = require("webpack-config-organizer");

/**
 * @param {object} [env]
 * @param {boolean} [env.clean = false]
 * @return {import("webpack").Configuration}
 */
module.exports = organizer(["typescript", "babel", "resolver"], () => ({
	target: "node",
	externalsPresets: { node: true },
	externals: [nodeExternals()],

	context: path.resolve(__dirname, "src"),
	entry: "main.ts",
	output: {
		filename: "[name].js",
		path: path.resolve(__dirname, "dist"),
	},

	plugins: [
		new BannerPlugin({
			banner: "#!/usr/bin/env node",
			raw: true,
			entryOnly: true,
		}),
	],

	optimization: {
		runtimeChunk: "single",
		moduleIds: "deterministic",
		chunkIds: "named",
	},
}));
