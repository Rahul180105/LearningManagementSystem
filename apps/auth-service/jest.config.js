const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
  preset:'ts-jest',
  testEnvironment: "node",
  roots:['<rootDir>/tests'],
  setupFilesAfterEnv:['<rootDir>/tests/setup.ts'],
  transform: {
    '^.+\\.ts$':'ts-jest',
  },
  collectCoverage:true,
  coverageDirectory:'coverage',
  testTimeout:10000,
  setupFiles:['dotenv/config']
};