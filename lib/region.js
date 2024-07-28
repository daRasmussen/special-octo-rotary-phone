const SubRows = require("../lib/subRows.js");
const SubCols = require("../lib/subCols.js");

class Region {
  constructor(rows, cols) {
    this.subRows = new SubRows(rows);
    this.subCols = new SubCols(cols);
  }
}
