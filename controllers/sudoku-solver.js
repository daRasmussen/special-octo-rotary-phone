const Row = require("../lib/row.js");
const Cols = require("../lib/cols.js");

const rows = {
  1: new Row(1),
  2: new Row(2),
  3: new Row(3),
  4: new Row(4),
  5: new Row(5),
  6: new Row(6),
  7: new Row(7),
  8: new Row(8),
  9: new Row(9),
};

function loadRows(puzzleString) {
  const firstRow = puzzleString.slice(0, 9);
  const secondRow = puzzleString.slice(9, 18);
  const thirdRow = puzzleString.slice(18, 27);
  const fourthRow = puzzleString.slice(27, 36);
  const fifthRow = puzzleString.slice(36, 45);
  const sixthRow = puzzleString.slice(45, 54);
  const seventhRow = puzzleString.slice(54, 63);
  const eighthRow = puzzleString.slice(63, 72);
  const ninthRow = puzzleString.slice(72, 81);

  rows[1].loadString(firstRow);
  rows[2].loadString(secondRow);
  rows[3].loadString(thirdRow);
  rows[4].loadString(fourthRow);
  rows[5].loadString(fifthRow);
  rows[6].loadString(sixthRow);
  rows[7].loadString(seventhRow);
  rows[8].loadString(eighthRow);
  rows[9].loadString(ninthRow);

  return {
    rows: rows,
    cols: new Cols(rows),
  };
}

class SudokuSolver {
  validate(puzzleString) {
    return puzzleString.length === 81 && /^[1-9.]*$/.test(puzzleString);
  }

  checkRowPlacement(puzzleString, row, column, value) {
    loadRows(puzzleString);

    const tmp = rows[row];
    for (let i = 1; i <= 9; i++) {
      if (tmp.getValueAt(i) === value && i !== column) {
        return false;
      }
    }
    return true;
  }

  checkColPlacement(puzzleString, row, column, value) {
    loadRows(puzzleString);

    for (let i = 1; i <= 9; i++) {
      if (rows[i].getValueAt(column) === value && i !== row) {
        return false;
      }
    }
    return true;
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    const { rows, cols } = loadRows(puzzleString);
  }

  solve(puzzleString) {}
}

module.exports = SudokuSolver;
