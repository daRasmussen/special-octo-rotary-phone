'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {

  let c = new ConvertHandler();
 
  app.route("/api/convert").get(function(req, res) {
    try {
      const { query: { input }} = req;
      const i = input || "";
      // console.log("input: ", input);
      const initNum = c.getNum(i);
      const initUnit = c.getUnit(i) !== "L" ? c.getUnit(i).toLowerCase(): "L";
      const returnNum = c.convert(initNum, initUnit);
      const returnUnit = c.getReturnUnit(i) !== "L" ? c.getReturnUnit(i).toLowerCase() : "L";
      const spellOut = {
          init: c.spellOutUnit(initUnit),
          return: c.spellOutUnit(returnUnit)
      };
      const string = c.getString(initNum, spellOut.init, returnNum, spellOut.return);
      const ans = {
          initNum,
          initUnit,
          returnNum,
          returnUnit,
          string
      };
      // console.log(ans)
      return res.json(ans);
    } catch (e) {
        const { message } = e;
        return res.send(message);
    }
  });
};
