module.exports = {
	resolve: {
		extensions: [".js"],
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: [/node_modules/, /__(tests|mocks|snapshots)__/, /e2e/, /test/],
				use: [
					{
						loader: "babel-loader",
					},
				],
			},
		],
	},
};
