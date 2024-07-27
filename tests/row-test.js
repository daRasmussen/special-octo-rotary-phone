const chai = require("chai");
const assert = chai.assert;

const Row = require("../lib/row.js");
const expected = {
  row: {
    length: 9,
  },
};

const emptyRow = [".", ".", ".", ".", ".", ".", ".", ".", "."];
const index = 1;
let row1;

suite("Row", () => {
  test("Create row index 1", function (done) {
    row1 = new Row(index);
    const { data: row } = row1;
    assert.isArray(row);
    assert.lengthOf(row, expected.row.length);
    assert.deepEqual(row, emptyRow);
    done();
  });
  /* Valid comlumn */
  test("Valid column", function (done) {
    const column = 1;
    const valid = row1.validColumn(column);
    assert.isTrue(valid);
    done();
  });
  test("Invalid column value: 0", function (done) {
    const column = 0;
    assert.throws(() => {
      row1.validColumn(column);
    }, "Column must be greater than or equal to 1");
    done();
  });
  test("Invalid column value: 10", function (done) {
    const column = 10;
    assert.throws(() => {
      row1.validColumn(column);
    }, "Column must be less than or equal to 9");
    done();
  });
  /* Valid value */
  test("Valid value", function (done) {
    const value = 1;
    const valid = row1.validValue(value);
    assert.isTrue(valid);
    done();
  });
  test("Invalid value: 0", function (done) {
    const value = 0;
    assert.throws(() => {
      row1.validValue(value);
    }, "Value must be greater than or equal to 1");
    done();
  });
  /* Add Number */
  test("Add number 1 to column 1", function (done) {
    const expected = [1, ".", ".", ".", ".", ".", ".", ".", "."];
    row1.addNumber(1, 1);
    assert.deepEqual(row1.data, expected);
    done();
  });
  /* Add Valid Period  */
  test("Valid period", function (done) {
    const value = ".";
    const valid = row1.validPeriod(value);
    assert.isTrue(valid);
    done();
  });
  test("Invalid period value ,", function (done) {
    const value = ",";
    assert.throws(() => {
      row1.validPeriod(value);
    }, "Value must be a period");
    done();
  });
  /* Add Period */
  test("Add period to column 1", function (done) {
    const expected = [".", ".", ".", ".", ".", ".", ".", ".", "."];
    row1.addPeriod(".", 1);
    assert.deepEqual(row1.data, expected);
    done();
  });
  /* Get Data */
  test("Get data", function (done) {
    const expected = [".", ".", ".", ".", ".", ".", ".", ".", "."];
    assert.deepEqual(row1.getData(), expected);
    done();
  });
  /* Get Index */
  test("Get index", function (done) {
    assert.equal(row1.getIndex(), index);
    done();
  });
  /* Get value at */
  test("Get value at column 1", function (done) {
    assert.equal(row1.getValueAt(1), ".");
    done();
  });
  test("Get invalid value at column 0", function (done) {
    assert.throws(() => {
      row1.getValueAt(0);
    }, "Column must be greater than or equal to 1");
    done();
  });
  /* Load Array */
  test("Load array", function (done) {
    const data = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    row1.loadArray(data);
    assert.deepEqual(row1.data, data);
    done();
  });
  /* Rest Data */
  test("Reset data", function (done) {
    row1.resetData();
    assert.deepEqual(row1.data, emptyRow);
    done();
  });
  test("Index should be 1", function (done) {
    assert.equal(row1.index, 1);
    done();
  });
  /* Load String */
  test("Load string", function (done) {
    const data = "123456789";
    row1.loadString(data);
    assert.deepEqual(
      row1.data,
      data.split("").map((v) => Number.parseInt(v)),
    );
    done();
  });
  /* Row Index */
  test("Row index should be 2 when a new row is created", function (done) {
    const row2 = new Row(2);
    assert.equal(row2.index, 2);
    done();
  });
});
