/** @type {import('ts-jest').JestConfigWithTsJest} **/
// module.exports = {
//   testEnvironment: "node",
//   transform: {
//     "^.+.tsx?$": ["ts-jest",{}],
//   },
// };

// Manuel configuration
import type { Config } from '@jest/types';

const baseDir = '<rootDir>/src/app/utils';   //'<rootDir>/src/app/**/*.ts';
const baseTestDir = '<rootDir>/src/test/utils';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: [
    `${baseDir}/**/*.ts`,
  ],
  testMatch: [
    `${baseTestDir}/**/*.ts`,
  ]
}

export default config;
