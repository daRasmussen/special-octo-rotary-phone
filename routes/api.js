'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {

  let c = new ConvertHandler();
 
  app.route("/api/convert").get(function(req, res) {
    try {
      const { query: { input }} = req;
      const i = input || "";
      const initNum = c.getNum(i);
      const initUnit = c.getUnit(i);
      const returnNum = c.convert(initNum, initUnit);
      const returnUnit = c.getReturnUnit(i);
      const string = c.getString(initNum, initUnit, returnNum, returnUnit);

      return res.json({
          initNum,
          initUnit,
          returnNum,
          returnUnit,
          string
      });
    } catch (e) {
        const { message } = e;
        return res.send(message);
    }
  });
};
