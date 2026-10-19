module.exports = {
  testEnvironment: 'jsdom',
  setupFiles: ['<rootDir>/tests/polyfills.js'],
  setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],
  moduleNameMapper: {
    '\\.module\\.css$': 'identity-obj-proxy',
    '\\.css$': '<rootDir>/tests/styleStub.js',
    '\\.(png|jpe?g|webp|avif|svg)$': '<rootDir>/tests/fileStub.js',
  },
  testMatch: ['<rootDir>/tests/**/*.test.{js,jsx}'],
};
