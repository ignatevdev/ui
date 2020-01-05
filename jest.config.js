module.exports = {
  verbose: false,
  setupFilesAfterEnv: ['<rootDir>enzyme.config.ts'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  testRegex: '/src/.*spec\\.tsx$',
  transform: {
    '^.+\\.tsx?$': 'babel-jest',
    '^.+\\.jsx?$': 'babel-jest'
  },
  globals: {
    NODE_ENV: 'test'
  },
  moduleFileExtensions: ['js', 'ts', 'tsx'],
  moduleDirectories: ['node_modules', 'src'],
  transformIgnorePatterns: ['node_modules/(?!ramda)']
};
