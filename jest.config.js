/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
	preset: "ts-jest",
	testEnvironment: "node",
	projects: ["./test/jest.config.js", "./e2e/jest.config.js"],

	watchPlugins: [
		"jest-watch-select-projects",
		"jest-watch-typeahead/filename",
		"jest-watch-typeahead/testname",
	],
};
