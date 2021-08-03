const { merge } = require("lodash");

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = merge(
	require("./jest-common.js"),
	require("./jest-typescript")(),
	{
		name: "app",
		displayName: {
			name: "Unit & Integration",
			color: "magenta",
		},
	}
);
