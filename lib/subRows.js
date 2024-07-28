const SubRow = require("./subRow.js");

class SubRows {
  constructor(subRow1 = null, subRow2 = null, subRow3 = null, region = null) {
    if (subRow1 === null) {
      throw new Error("subRow1 must be defined");
    }
    if (subRow1 instanceof SubRow !== true) {
      throw new Error("subRow1 must be an instance of SubRow");
    }
    if (subRow2 === null) {
      throw new Error("subRow2 must be defined");
    }
    if (subRow3 instanceof SubRow !== true) {
      throw new Error("subRow3 must be an instance of SubRow");
    }
    if (subRow3 === null) {
      throw new Error("subRow3 must be defined");
    }
    if (region === null) {
      throw new Error("region must be defined");
    }
    if (typeof region !== "string") {
      throw new Error("region must be a string");
    }
    if (region.length !== 1) {
      throw new Error("region must be a single character");
    }
    if (region.match(/[A-I]/) === null) {
      throw new Error("region must be A, B, C, D, E, F, G, H, or I");
    }
    //this.data = [subRow1.data, subRow2.data, subRow3.data];
    this.region = region;
    const { data: region1 } = subRow1;
    this.data = {};
    this.data[`${region}1`] = region1;
    const { data: region2 } = subRow2;
    this.data[`${region}2`] = region2;
    const { data: region3 } = subRow3;
    this.data[`${region}3`] = region3;
  }

  getRegion() {
    return this.region;
  }

  getData() {
    return this.data;
  }

  getArr() {
    return [
      this.data[`${this.region}1`],
      this.data[`${this.region}2`],
      this.data[`${this.region}3`],
    ].flat();
  }
}

module.exports = SubRows;
