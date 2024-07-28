const Row = require("./row");

class Cols {
  constructor(rows) {
    // Rows should be an object with keys 1-9
    // and only accepatable value is an instance of Row
    if (rows === undefined) {
      throw new Error("Rows is required");
    }
    if (typeof rows !== "object") {
      throw new Error("Rows must be an object");
    }
    if (Object.keys(rows).length !== 9) {
      throw new Error("Rows must have 9 keys");
    }
    if (Object.values(rows).some((row) => !(row instanceof Row))) {
      throw new Error("Rows must have 9 keys");
    }
    if (
      Object.keys(rows).some(
        (key) => ![1, 2, 3, 4, 5, 6, 7, 8, 9].includes(parseInt(key)),
      )
    ) {
      throw new Error("Rows must have keys 1-9");
    }

    this.data = {
      1: { data: [], index: 1 },
      2: { data: [], index: 2 },
      3: { data: [], index: 3 },
      4: { data: [], index: 4 },
      5: { data: [], index: 5 },
      6: { data: [], index: 6 },
      7: { data: [], index: 7 },
      8: { data: [], index: 8 },
      9: { data: [], index: 9 },
    };

    for (let i = 1; i <= 9; i++) {
      for (let j = 1; j <= 9; j++) {
        this.data[j].data.push(rows[i].getValueAt(j));
      }
    }
  }

  getRegion(row, col) {
    if (row === undefined) {
      throw new Error("Row is required");
    }
    if (col === undefined) {
      throw new Error("Col is required");
    }
    if (![1, 2, 3, 4, 5, 6, 7, 8, 9].includes(row)) {
      throw new Error("Row must be between 1-9");
    }
    if (![1, 2, 3, 4, 5, 6, 7, 8, 9].includes(col)) {
      throw new Error("Col must be between 1-9");
    }

    //const region = Math.floor((row - 1) / 3) * 3 + Math.floor((col - 1) / 3) + 1;
    //return region;
  }
}

module.exports = Cols;
