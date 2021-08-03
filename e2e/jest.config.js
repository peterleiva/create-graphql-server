const { resolve } = require("path");

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = Object.assign(
	{},
	require("../test/jest-common"),
	require("../test/jest-typescript")(resolve(__dirname, "./tsconfig.json")),
	{
		roots: ["<rootDir>/e2e", "<rootDir>/test"],
		name: "e2e",
		displayName: {
			name: "E2E Tests",
			color: "blue",
		},

		moduleDirectories: [
			"node_modules",
			resolve(__dirname),
			resolve(__dirname, "../test"),
		],
	}
);
