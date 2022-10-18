use strict';

// process.env.NODE_ENV = "test";

const { colors } = require('mocha/lib/reporters/base');
colors.pass = 32;

module.exports = {
  // "async-only": true,
  timeout: 60000,
  retries: 2,
  ui: "tdd",
  watch: true,
  'watch-files': ['tests/*.js', 'routes/api.js'],
  'watch-ignore': ['node_modules']
};

