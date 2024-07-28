const chai = require("chai");
const assert = chai.assert;

const Row = require("../lib/row.js");
const SubRow = require("../lib/subRow.js");
const expected = {
  row: {
    length: 3,
  },
};
const rowIndex = 1;
const puzzelRow = ["1", ".", ".", "2", ".", ".", "3", ".", "."];
const row = new Row(rowIndex);
row.loadArray(puzzelRow);

suite.only("SubRow", () => {
  test("Create subRow for row with index 1", function (done) {
    const sr1 = new SubRow(row, 1);
    assert.equal(sr1.data.length, expected.row.length);
    assert.deepEqual(sr1.data, row.data.slice(0, 3));
    done();
  });
  test("Create subRow for row with index 2", function (done) {
    const sr2 = new SubRow(row, 2);
    assert.equal(sr2.data.length, expected.row.length);
    assert.deepEqual(sr2.data, row.data.slice(3, 6));
    done();
  });
  test("Create subRow for row with index 3", function (done) {
    const sr3 = new SubRow(row, 3);
    assert.equal(sr3.data.length, expected.row.length);
    assert.deepEqual(sr3.data, row.data.slice(6, 9));
    done();
  });
});
