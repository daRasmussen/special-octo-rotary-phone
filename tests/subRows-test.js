const chai = require("chai");
const assert = chai.assert;

const Row = require("../lib/row.js");
const SubRow = require("../lib/subRow.js");
const SubRows = require("../lib/subRows.js");

const rowIndex1 = 1;
const puzzelRow1 = ["1", ".", ".", "2", ".", ".", "3", ".", "."];
const row1 = new Row(rowIndex1);
row1.loadArray(puzzelRow1);

const rowIndex2 = 2;
const puzzelRow2 = ["4", ".", ".", "5", ".", ".", "6", ".", "."];
const row2 = new Row(rowIndex2);
row2.loadArray(puzzelRow2);

const rowIndex3 = 3;
const puzzelRow3 = ["7", ".", ".", "8", ".", ".", "9", ".", "."];
const row3 = new Row(rowIndex3);
row3.loadArray(puzzelRow3);

suite.only("SubRows", () => {
  test("Create subRows region A", function (done) {
    const a1 = new SubRow(row1, 1);
    const a2 = new SubRow(row2, 1);
    const a3 = new SubRow(row3, 1);
    const region = "A";
    const subRows = new SubRows(a1, a2, a3, region);
    const data = [1, ".", ".", 4, ".", ".", 7, ".", "."];
    assert.equal(subRows.region, region);
    assert.deepEqual(data, subRows.getArr());
    done();
  });
});
