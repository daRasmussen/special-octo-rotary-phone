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
              throw new Error("invalid data");
            }
        }
    } else if (!isFloat && !isFrac) {
        result = parseInt(input);
    }

    return result ? result : 1;
  };
  
  this.getUnit = function(input) {
    let result = input.split("").filter(v => !parseInt(v === "0" ? 1 : v) && v !== ".").join("");
    const units = ["L", "gal", "mi", "km", "lbs", "kg"];
    if(units.includes(result)) {
          return result;
    } else {
        throw new Error("invalid unit");
    }
  };
  
  this.getReturnUnit = function(initUnit) {
    const units = {
        "L": "gal",
        "l": "gal",
        "Kg": "lbs",
        "kg": "lbs",
        "Km": "mi",
        "km": "mi",
        "gal": "L",
        "lbs": "Kg",
        "mi": "Km"
    };
    const inUnit = this.getUnit(initUnit);
    let result = units[inUnit];
    
    return result;
  };

  this.spellOutUnit = function(unit) {
      const units = {
          "L": "liter",
          "l": "liter",
          "Kg": "kilograms",
          "kg": "kilograms",
          "Km": "kilometers",
          "km": "kilometers",
          "gal": "gallons",
          "lbs": "pounds",
          "mi": "miles",
      }
    let result = units[unit];
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;

    if (initUnit === "gal") {
        result = initNum * galToL;
    } else if (initUnit === "L" || initUnit === "l") {
        result = initNum * (1 / galToL);
    } else if (initUnit === "mi") {
        result = initNum * miToKm;
    } else if (initUnit === "Km" || initUnit === "km") {
        result = initNum * (1 / miToKm);
    } else if (initUnit === "lbs") {
        result = initNum * lbsToKg;
    } else if (initUnit === "Kg" || initUnit === "kg") {
        result = initNum * (1 / lbsToKg);
    }
    return Number(result.toFixed(5));
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${initUnit} converts to ${returnNum} ${returnUnit}`;
  };
  
}

module.exports = ConvertHandler;
