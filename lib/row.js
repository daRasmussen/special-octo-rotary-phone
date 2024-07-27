class Row {
  constructor(index) {
    this.data = new Array(9).fill(".");
    if (typeof index !== "undefined" && !Number.isInteger(index)) {
      throw new Error("Index must be an integer");
    }
    if (index < 1) {
      throw new Error("Index must be greater than or equal to 1");
    }
    if (index > 9) {
      throw new Error("Index must be less than or equal to 9");
    }
    this.index = index;
  }

  validColumn(column) {
    if (typeof column !== "undefined" && !Number.isInteger(column)) {
      throw new Error("Column must be an integer");
    }
    if (typeof column !== "undefined" && column < 1) {
      throw new Error("Column must be greater than or equal to 1");
    }
    if (typeof column !== "undefined" && column > 9) {
      throw new Error("Column must be less than or equal to 9");
    }
    return true;
  }

  validValue(value) {
    if (typeof value !== "undefined" && !Number.isInteger(value)) {
      throw new Error("Value must be an integer");
    }
    if (typeof value !== "undefined" && value < 1) {
      throw new Error("Value must be greater than or equal to 1");
    }
    if (typeof value !== "undefined" && value > 9) {
      throw new Error("Value must be less than or equal to 9");
    }
    return true;
  }

  validPeriod(value) {
    if (typeof value !== "string") {
      throw new Error("Value must be a string");
    }
    if (value !== ".") {
      throw new Error("Value must be a period");
    }
    return true;
  }

  addPeriod(value, column) {
    if (this.validPeriod(value) && this.validColumn(column)) {
      this.data[column - 1] = value;
    }
  }

  addNumber(value, column) {
    if (this.validValue(value) && this.validColumn(column)) {
      this.data[column - 1] = value;
    }
  }

  getData() {
    return this.data;
  }

  getIndex() {
    return this.index;
  }

  getValueAt(column) {
    if (this.validColumn(column)) {
      return this.data[column - 1];
    }
  }

  loadArray(arr) {
    if (!Array.isArray(arr)) {
      throw new Error("Array must be an array");
    }
    if (arr.length !== 9) {
      throw new Error("Array must be 9 characters long");
    }
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] !== ".") {
        this.addNumber(Number.parseInt(arr[i]), i + 1);
      } else {
        this.addPeriod(arr[i], i + 1);
      }
    }
  }

  resetData() {
    this.data = new Array(9).fill(".");
  }

  loadString(str) {
    if (typeof str !== "string") {
      throw new Error("String must be a string");
    }
    if (str.length !== 9) {
      throw new Error("String must be 9 characters long");
    }
    const arr = str.split("");
    this.loadArray(arr);
  }
}

module.exports = Row;
