const { colors, symbols } = require("mocha/lib/reporters/base");
colors.pass = 32;
symbols.ok = "✅";

module.exports = {
  timeout: 5000,
  require: ["@babel/register"],
  recursive: true,
  exit: true,
  ui: "tdd",
  spec: ["tests/**/*-test.js"],
};
