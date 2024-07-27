const chai = require("chai");
const assert = chai.assert;

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

const data1 = "111111111";
const data2 = "222222222";
const data3 = "333333333";
const data4 = "444444444";
const data5 = "555555555";
const data6 = "666666666";
const data7 = "777777777";
const data8 = "888888888";
const data9 = "999999999";

rows[1].loadString(data1);
rows[2].loadString(data2);
rows[3].loadString(data3);
rows[4].loadString(data4);
rows[5].loadString(data5);
rows[6].loadString(data6);
rows[7].loadString(data7);
rows[8].loadString(data8);
rows[9].loadString(data9);

const expected = [
  "123456789",
  "123456789",
  "123456789",
  "123456789",
  "123456789",
  "123456789",
  "123456789",
  "123456789",
  "123456789",
];

suite("Cols", () => {
  test("Get value", function (done) {
    const cols = new Cols(rows);
    for (let col of Object.keys(cols.data)) {
      assert.equal(cols.data[col].data.join(""), expected[col - 1],
        `Column ${col} should have values 1-9`
      );
    }
    done();
  });
});
