/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/en/configuration.html
 */

export default {
  roots: ["<rootDir>/src"],
  collectCoverageFrom: ["<rootDir>/src/**/*.ts"],
  coverageDirectory: "coverage",
  transform: {
    ".+\\.ts$": "ts-jest",
  },
  coverageProvider: "v8",
  testEnvironment: "node",
};
