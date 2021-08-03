/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
	preset: "ts-jest",
	testEnvironment: "node",
	projects: ["<rootDir>/test", "<rootDir>/e2e"],

	watchPlugins: [
		"jest-watch-select-projects",
		"jest-watch-typeahead/filename",
		"jest-watch-typeahead/testname",
	],
};
