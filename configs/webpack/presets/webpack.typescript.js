const path = require("path");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

const configFile = path.resolve(
	__dirname,
	"../../../",
	"src/tsconfig.app.json"
);

/**
 * webpack typescript configuration
 *
 * @param {object} [env]
 * @param {boolean} [env.lint]
 * @return {import("webpack").Configuration}
 */
module.exports = function webpackTypescript({ lint }) {
	return {
		resolve: {
			extensions: [".ts"],
		},

		module: {
			rules: [
				{
					test: /\.tsx?$/,
					exclude: [
						/node_modules/,
						/__(tests|mocks|snapshots)__/,
						/e2e/,
						/test/,
					],

					use: [
						{
							loader: "babel-loader",
						},
						{
							loader: "ts-loader",
							options: {
								configFile,
								transpileOnly: true,
							},
						},
					],
				},
			],
		},

		plugins: [
			new ForkTsCheckerWebpackPlugin({
				typescript: { configFile },
				eslint: lint && {
					files: ".",
					options: {
						ignorePattern: ["__mocks__", "__snapshots__", "__tests__"],
					},
				},
			}),
		],
	};
};
