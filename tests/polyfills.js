// jsdom does not expose these Node globals, but React Router needs them.
const { TextEncoder, TextDecoder } = require('node:util');

Object.assign(global, { TextEncoder, TextDecoder });
