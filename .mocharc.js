const { colors, symbols } = require("mocha/lib/reporters/base");
colors.pass = 32;
symbols.ok = "😀";

module.exports = {
  // --timeout 5000 --require @babel/register --recursive --exit --ui tdd tests/
  diff: true,
  extension: ["js"],
  package: "./package.json",
  reporter: "spec",
  slow: 75,
  recursive: true,
  timeout: 5000,
  ui: "tdd",
  "watch-files": ["**/*.js"],
  "watch-ignore": ["node_modules", "public"],
  spec: ["tests/**/*.js"],
};
