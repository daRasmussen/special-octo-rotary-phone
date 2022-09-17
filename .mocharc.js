'use strict';

const { colors } = require('mocha/lib/reporters/base');
colors.pass = 32;

module.exports = {
  watch: false,
  'watch-files': ['tests/*.js'],
  'watch-ignore': ['node_modules']
};

