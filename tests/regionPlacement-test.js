const chai = require("chai");
const assert = chai.assert;

const Solver = require("../controllers/sudoku-solver.js");
const solver = new Solver();

const r1c1 = [
  ".23......",
  "456......",
  "789......",
  ".........",
  ".........",
  ".........",
  ".........",
  ".........",
  ".........",
];
suite("Region Tests", () => {
  test("Logic handles a valid region placement", function (done) {
    const puzzle = r1c1.join("");
    const row = 1;
    const column = 1;
    const value = 1;
    const res = solver.checkRegionPlacement(puzzle, row, column, value);
    assert.equal(res, true, "Inserting 1 in empty cell should return true");
    for (let i = 1; i <= 9; i++) {
      if (i === 1) {
        continue;
      }
      const res = solver.checkRegionPlacement(puzzle, row, column, i);
      assert.equal(
        res,
        false,
        `Inserting ${i} in a region with ${i} should return false`,
      );
    }
    done();
  });
});
