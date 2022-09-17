const Units = require("../Units.js");
const ui = new Units();

function ConvertHandler() {
  
  this.getNum = function(input) {
    let result;
    const str = input.toString();
    const isFloat = str.split(".").length > 1;
    const isFrac = str.split("/").length > 1;
    const isValidFrac = str.split("/").length === 2;

    if (isFloat && !isFrac) {
      result = parseFloat(input);
    } else if (isFrac) {
        if (isValidFrac) {
            result = eval(str);
        } else {
            const v = str.split("/").filter(function(v) {
                const isFloat = v.split(".").length > 1;
                const isNumber = Number(v);
                return isFloat || isNumber ? "" : v;
            });
            if(v[0].split("").length > 5) {
              throw new Error("invalid number and data");
            } else {
              throw new Error("invalid number");
            }
        }
    } else if (!isFloat && !isFrac) {
        result = parseInt(input);
    }

    return result ? result : 1;
  };
  
  this.getUnit = function(input) {
    let result = input.split("").filter(v => !parseInt(v === "0" ? 1 : v) && v !== ".").join("");
    const units = ui.getUnits();
    result = result === "l" ? "L" : result; 
    // console.log(result);
    if(units.includes(result)) {
          return result;
    } else {
        throw new Error("invalid unit");
    }
  };
  
  this.getReturnUnit = function(initUnit) {
    const units = ui.getUnitChild();
    const inUnit = this.getUnit(initUnit);
    let result = units[inUnit];
    
    return result;
  };

  this.spellOutUnit = function(unit) {
    const units = ui.getUnitName();
    let result = units[unit];
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    const unit = initUnit.toLowerCase();
    let result;

    if (unit === "gal") {
        result = initNum * galToL;
    } else if (unit === "l") {
        result = initNum * (1 / galToL);
    } else if (unit === "mi") {
        result = initNum * miToKm;
    } else if (unit === "km") {
        result = initNum * (1 / miToKm);
    } else if (unit === "lbs") {
        result = initNum * lbsToKg;
    } else if (unit === "kg") {
        result = initNum * (1 / lbsToKg);
    }
    return Number(result.toFixed(5));
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${initUnit} converts to ${returnNum} ${returnUnit}`;
  };
  
}

module.exports = ConvertHandler;
