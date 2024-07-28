const SubRow = require("./SubRow");

class SubCol {
  constructor(subRows = null, chunk = null) {
    if (row === null) {
      throw new Error("SubRow needs a Row to be defined");
    }
    if (row instanceof Row !== true) {
      throw new Error("Row must be an instance of Row");
    }
    this.parent = row;
    if (chunk === null) {
      throw new Error("SubRow needs a chunk to be defined");
    }
    if (Number.isInteger(chunk) === false) {
      throw new Error("Chunk must be an integer");
    }
    if (chunk < 1) {
      throw new Error("Chunk must be greater than or equal to 1");
    }
    if (chunk > 3) {
      throw new Error("Chunk must be less than or equal to 3");
    }
    this.chunk = chunk;
    if (this.chunk === 1) {
      this.data = this.parent.data.slice(0, 3);
    }
    if (this.chunk === 2) {
      this.data = this.parent.data.slice(3, 6);
    }
    if (this.chunk === 3) {
      this.data = this.parent.data.slice(6, 9);
    }
  }
}

module.exports = SubRow;
