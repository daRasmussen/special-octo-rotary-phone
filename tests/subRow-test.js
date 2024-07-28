const chai = require("chai");
const assert = chai.assert;

const Row = require("../lib/row.js");
const SubRow = require("../lib/subRow.js");

const expected = {
  row: {
    length: 3,
  },
};
const rowIndex1 = 1;
const puzzelRow = ["1", ".", ".", "2", ".", ".", "3", ".", "."];
const row = new Row(rowIndex1);
row.loadArray(puzzelRow);

suite("SubRow", () => {
  test("Create subRow for row with index 1", function (done) {
    const chunk = 1;
    const sr1 = new SubRow(row, 1);
    assert.equal(sr1.data.length, expected.row.length);
    assert.deepEqual(sr1.data, row.data.slice(0, 3));
    assert.equal(sr1.chunk, chunk);
    assert.equal(sr1.parent.index, rowIndex1);
    done();
  });
  test("Create subRow for row with index 2", function (done) {
    const chunk = 2;
    const sr2 = new SubRow(row, 2);
    assert.equal(sr2.data.length, expected.row.length);
    assert.deepEqual(sr2.data, row.data.slice(3, 6));
    assert.equal(sr2.chunk, chunk);
    assert.equal(sr2.parent.index, rowIndex1);
    done();
  });
  test("Create subRow for row with index 3", function (done) {
    const chunk = 3;
    const sr3 = new SubRow(row, 3);
    assert.equal(sr3.data.length, expected.row.length);
    assert.deepEqual(sr3.data, row.data.slice(6, 9));
    assert.equal(sr3.chunk, chunk);
    assert.equal(sr3.parent.index, rowIndex1);
    done();
  });
  test("Create subRow for 2 rows with chunk 1", function (done) {
    const rowIndex2 = 2;
    const puzzelRow2 = ["4", ".", ".", "5", ".", ".", "6", ".", "."];
    const row2 = new Row(rowIndex2);
    row2.loadArray(puzzelRow2);
    const sr1 = new SubRow(row, 1);
    const sr2 = new SubRow(row2, 1);
    assert.equal(sr1.data.length, expected.row.length);
    assert.deepEqual(sr1.data, row.data.slice(0, 3));
    assert.equal(sr1.chunk, 1);
    assert.equal(sr1.parent.index, rowIndex1);
    assert.equal(sr2.data.length, expected.row.length);
    assert.deepEqual(sr2.data, row2.data.slice(0, 3));
    assert.equal(sr2.chunk, 1);
    assert.equal(sr2.parent.index, rowIndex2);
    assert.notDeepEqual(sr1.data, sr2.data);
    assert.notEqual(sr1.parent.index, sr2.parent.index);
    assert.equal(sr1.chunk, sr2.chunk);
    done();
  });
});
