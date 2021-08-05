/**
 * Babel configuration file
 * @type {import('@babel/core').ConfigFunction}
 */
module.exports = {
	env: {
		development: {
			retainLines: true,
		},
	},
	presets: [
		[
			"@babel/preset-env",
			{
				targets: {
					node: "current",
				},
				useBuiltIns: "usage",
				corejs: { version: 3.16 },
				shippedProposals: true,
			},
		],
	],
};
