'use strict';

const { colors } = require('mocha/lib/reporters/base');
colors.pass = 32;

module.exports = {
  watch: true,
  'watch-files': ['tests/*.js'],
  'watch-ignore': ['node_modules']
};

