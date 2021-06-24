const { resolve } = require("path");

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
	...require("../test/jest-typescript")(resolve(__dirname, "./tsconfig.json")),
	name: "e2e",
	displayName: "E2E Tests",
};
