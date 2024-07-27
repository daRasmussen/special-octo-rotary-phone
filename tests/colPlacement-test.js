const chai = require("chai");
const assert = chai.assert;

const Solver = require("../controllers/sudoku-solver.js");
const solver = new Solver();

const puzzleArray = [
  ".11111111",
  "2.2222222",
  "33.333333",
  "444.44444",
  "5555.5555",
  "66666.666",
  "777777.77",
  "8888888.8",
  "99999999.",
];
suite("Col placement", () => {
  test("Check column 1 placement", function (done) {
    const puzzleString = puzzleArray.join("");
    const row = 1;
    const col = 1;
    assert.equal(solver.checkColPlacement(puzzleString, row, col, 1), true);
    assert.equal(solver.checkColPlacement(puzzleString, row, col, 2), false);
    assert.equal(solver.checkColPlacement(puzzleString, row, col, 3), false);
    assert.equal(solver.checkColPlacement(puzzleString, row, col, 4), false);
    assert.equal(solver.checkColPlacement(puzzleString, row, col, 5), false);
    assert.equal(solver.checkColPlacement(puzzleString, row, col, 6), false);
    assert.equal(solver.checkColPlacement(puzzleString, row, col, 7), false);
    assert.equal(solver.checkColPlacement(puzzleString, row, col, 8), false);
    assert.equal(solver.checkColPlacement(puzzleString, row, col, 9), false);
    done();
  });
  test("Check column 2 placement", function (done) {
    const puzzleString = puzzleArray.join("");
    const row = 2;
    const col = 2;
    assert.equal(solver.checkColPlacement(puzzleString, row, col, 1), false);
    assert.equal(solver.checkColPlacement(puzzleString, row, col, 2), true);
    assert.equal(solver.checkColPlacement(puzzleString, row, col, 3), false);
    assert.equal(solver.checkColPlacement(puzzleString, row, col, 4), false);
    assert.equal(solver.checkColPlacement(puzzleString, row, col, 5), false);
    assert.equal(solver.checkColPlacement(puzzleString, row, col, 6), false);
    assert.equal(solver.checkColPlacement(puzzleString, row, col, 7), false);
    assert.equal(solver.checkColPlacement(puzzleString, row, col, 8), false);
    assert.equal(solver.checkColPlacement(puzzleString, row, col, 9), false);
    done();
  });
  test("Check column 3 placement", function (done) {
    const puzzleString = puzzleArray.join("");
    const row = 3;
    const col = 3;
    assert.equal(solver.checkColPlacement(puzzleString, row, col, 1), false);
    assert.equal(solver.checkColPlacement(puzzleString, row, col, 2), false);
    assert.equal(solver.checkColPlacement(puzzleString, row, col, 3), true);
    assert.equal(solver.checkColPlacement(puzzleString, row, col, 4), false);
    assert.equal(solver.checkColPlacement(puzzleString, row, col, 5), false);
    assert.equal(solver.checkColPlacement(puzzleString, row, col, 6), false);
    assert.equal(solver.checkColPlacement(puzzleString, row, col, 7), false);
    assert.equal(solver.checkColPlacement(puzzleString, row, col, 8), false);
    assert.equal(solver.checkColPlacement(puzzleString, row, col, 9), false);
    done();
  });
  test("Check column 4 placement", function (done) {
    const puzzleString = puzzleArray.join("");
    const row = 4;
    const col = 4;
    assert.equal(solver.checkColPlacement(puzzleString, row, col, 1), false);
    assert.equal(solver.checkColPlacement(puzzleString, row, col, 2), false);
    assert.equal(solver.checkColPlacement(puzzleString, row, col, 3), false);
    assert.equal(solver.checkColPlacement(puzzleString, row, col, 4), true);
    assert.equal(solver.checkColPlacement(puzzleString, row, col, 5), false);
    assert.equal(solver.checkColPlacement(puzzleString, row, col, 6), false);
    assert.equal(solver.checkColPlacement(puzzleString, row, col, 7), false);
    assert.equal(solver.checkColPlacement(puzzleString, row, col, 8), false);
    assert.equal(solver.checkColPlacement(puzzleString, row, col, 9), false);
    done();
  });
  test("Check column 5 placement", function (done) {
    const puzzleString = puzzleArray.join("");
    const row = 5;
    const col = 5;
    assert.equal(solver.checkColPlacement(puzzleString, row, col, 1), false);
    assert.equal(solver.checkColPlacement(puzzleString, row, col, 2), false);
    assert.equal(solver.checkColPlacement(puzzleString, row, col, 3), false);
    assert.equal(solver.checkColPlacement(puzzleString, row, col, 4), false);
    assert.equal(solver.checkColPlacement(puzzleString, row, col, 5), true);
    assert.equal(solver.checkColPlacement(puzzleString, row, col, 6), false);
    assert.equal(solver.checkColPlacement(puzzleString, row, col, 7), false);
    assert.equal(solver.checkColPlacement(puzzleString, row, col, 8), false);
    assert.equal(solver.checkColPlacement(puzzleString, row, col, 9), false);
    done();
  });
  test("Check column 6 placement", function (done) {
    const puzzleString = puzzleArray.join("");
    const row = 6;
    const col = 6;
    assert.equal(solver.checkColPlacement(puzzleString, row, col, 1), false);
    assert.equal(solver.checkColPlacement(puzzleString, row, col, 2), false);
    assert.equal(solver.checkColPlacement(puzzleString, row, col, 3), false);
    assert.equal(solver.checkColPlacement(puzzleString, row, col, 4), false);
    assert.equal(solver.checkColPlacement(puzzleString, row, col, 5), false);
    assert.equal(solver.checkColPlacement(puzzleString, row, col, 6), true);
    assert.equal(solver.checkColPlacement(puzzleString, row, col, 7), false);
    assert.equal(solver.checkColPlacement(puzzleString, row, col, 8), false);
    assert.equal(solver.checkColPlacement(puzzleString, row, col, 9), false);
    done();
  });
  test("Check column 7 placement", function (done) {
    const puzzleString = puzzleArray.join("");
    const row = 7;
    const col = 7;
    assert.equal(solver.checkColPlacement(puzzleString, row, col, 1), false);
    assert.equal(solver.checkColPlacement(puzzleString, row, col, 2), false);
    assert.equal(solver.checkColPlacement(puzzleString, row, col, 3), false);
    assert.equal(solver.checkColPlacement(puzzleString, row, col, 4), false);
    assert.equal(solver.checkColPlacement(puzzleString, row, col, 5), false);
    assert.equal(solver.checkColPlacement(puzzleString, row, col, 6), false);
    assert.equal(solver.checkColPlacement(puzzleString, row, col, 7), true);
    assert.equal(solver.checkColPlacement(puzzleString, row, col, 8), false);
    assert.equal(solver.checkColPlacement(puzzleString, row, col, 9), false);
    done();
  });
  test("Check column 8 placement", function (done) {
    const puzzleString = puzzleArray.join("");
    const row = 8;
    const col = 8;
    assert.equal(solver.checkColPlacement(puzzleString, row, col, 1), false);
    assert.equal(solver.checkColPlacement(puzzleString, row, col, 2), false);
    assert.equal(solver.checkColPlacement(puzzleString, row, col, 3), false);
    assert.equal(solver.checkColPlacement(puzzleString, row, col, 4), false);
    assert.equal(solver.checkColPlacement(puzzleString, row, col, 5), false);
    assert.equal(solver.checkColPlacement(puzzleString, row, col, 6), false);
    assert.equal(solver.checkColPlacement(puzzleString, row, col, 7), false);
    assert.equal(solver.checkColPlacement(puzzleString, row, col, 8), true);
    assert.equal(solver.checkColPlacement(puzzleString, row, col, 9), false);
    done();
  });
  test("Check column 9 placement", function (done) {
    const puzzleString = puzzleArray.join("");
    const row = 9;
    const col = 9;
    assert.equal(solver.checkColPlacement(puzzleString, row, col, 1), false);
    assert.equal(solver.checkColPlacement(puzzleString, row, col, 2), false);
    assert.equal(solver.checkColPlacement(puzzleString, row, col, 3), false);
    assert.equal(solver.checkColPlacement(puzzleString, row, col, 4), false);
    assert.equal(solver.checkColPlacement(puzzleString, row, col, 5), false);
    assert.equal(solver.checkColPlacement(puzzleString, row, col, 6), false);
    assert.equal(solver.checkColPlacement(puzzleString, row, col, 7), false);
    assert.equal(solver.checkColPlacement(puzzleString, row, col, 8), false);
    assert.equal(solver.checkColPlacement(puzzleString, row, col, 9), true);
    done();
  });
});
