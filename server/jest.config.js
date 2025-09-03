// server/jest.config.js
/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    collectCoverageFrom: [
        "src/**/*.ts",
        "!src/index.ts", // Don't test the main entry point that starts the server
    ],
    coverageDirectory: "coverage",
    // This is crucial for using ES6 imports in tests
    transform: {
        "^.+\\.tsx?$": ["ts-jest", { useESM: true }],
    },
    moduleNameMapper: {
        "^(\\.{1,2}/.*)\\.js$": "$1",
    },
    extensionsToTreatAsEsm: [".ts"],
    verbose: true,
};
