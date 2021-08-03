const { resolve } = require("path");

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
	rootDir: "../",
	testEnvironment: "node",
	roots: ["<rootDir>/test", "<rootDir>/src"],
	moduleDirectories: [
		"node_modules",
		resolve(__dirname),
		resolve(__dirname, "../src"),
	],
	setupFilesAfterEnv: ["jest-extended"],
};
