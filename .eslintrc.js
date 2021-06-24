module.exports = {
	env: {
		es2021: true,
		node: true,
	},
	extends: ["eslint:recommended", "prettier"],
	parserOptions: {
		ecmaVersion: 12,
	},

	settings: {
		"import/resolver": {
			webpack: {
				config: "./configs/webpack/presets/webpack.resolver.js",
			},
		},
	},

	overrides: [
		{
			files: "**/*.ts",
			extends: "./configs/eslint/typescript",
		},
		{
			files: ["./src/scripts/**/*", "./scripts/**/*"],
			extends: "./configs/eslint/scripts",
		},
		{
			files: "**/*.json",
			extends: ["plugin:json/recommended"],
		},
		{
			files: "**/*.md",
			extends: "plugin:markdown/recommended",
		},
		{
			files: [
				"./src/**/__*(tests|mocks|snapshots)__/**/*",
				"./e2e/**/*",
				"./test/**/*",
			],
			extends: "./configs/eslint/jest",
		},
	],
};
