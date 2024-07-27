const chai = require("chai");
const assert = chai.assert;

const Solver = require("../controllers/sudoku-solver.js");
const solver = new Solver();

const puzzleArray = [
  ".23456789",
  "1.3456789",
  "12.456789",
  "123.56789",
  "1234.6789",
  "12345.789",
  "123456.89",
  "1234567.9",
  "12345678.",
];
suite("Row placement", () => {
  for (let i = 1; i <= 9; i++) {
    test(`Logic handles a valid row placement number ${i} is not in the row ${i} and column ${i}`, function (done) {
      const puzzle = puzzleArray.join("");
      const row = i;
      const value = i;
      const column = i;
      const res = solver.checkRowPlacement(puzzle, row, column, value);
      assert.equal(
        res,
        true,
        `Inserting ${i} in empty cell should return true`,
      );
      done();
    });
    test(`Logic handles an invalid row placement number ${10 - i} is in the row ${i} and column ${i}`, function (done) {
      if (10 - i === 5) {
        // Skip 5 because we don't have it in the puzzle
        done();
      }
      const puzzle = puzzleArray.join("");
      const row = i;
      const column = i;
      const value = 10 - i;
      const res = solver.checkRowPlacement(puzzle, row, column, value);
      assert.equal(
        res,
        false,
        `Inserting ${10 - i} in a row with ${10 - i} should return false`,
      );
      done();
    });
  }
});
