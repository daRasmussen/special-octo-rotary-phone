const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
    suite("ConvertHandler number input handler", function() {
        test("converHandler should correctly read a whole number input", function() {
            const i = 1;
            const r = convertHandler.getNum(i);
            assert.strictEqual(r, i)
            assert.typeOf(i, "number");
        });
        test("convertHandler should correctly read a decimal number input", function() {
            const i = 1.1;
            const r = convertHandler.getNum(i);
            assert.strictEqual(i, r);
            assert.typeOf(i, "number");
        });
        test("convertHandler should correctly read a fractional input", function() {
            const i = "2/2";
            const e = 1; 
            const r = convertHandler.getNum(i);
            assert.notStrictEqual(i, r);
            assert.strictEqual(r, e);
            assert.typeOf(r, "number");
        });
        test("convertHandler should correctly read a fractional input with a decimal", function() {
            const i = "2.0/2.0";
            const e = 1;
            const r = convertHandler.getNum(i);
            assert.notStrictEqual(i, r);
            assert.strictEqual(r, e);
            assert.typeOf(r, "number");
        });
        test("convertHandler should correctly return an error on a double fraction", function() {
            const i = "3/2/3";
            assert.throws(function() {
                convertHandler.getNum(i);
            }, Error);
        });
        test("convertHandler should correctly default to numerical input of 1 when no input is provided", function() {
            const i = "";
            const e = 1; 
            const r = convertHandler.getNum(i);
            assert.strictEqual(r, e);
        });
    });
    suite("ConverHandler unit input handler", function() {
        test("convertHandler should correctly read each valid input unit.", function() {
            const units = ["L", "gal", "mi", "km", "lbs", "kg"];
            for(const unit of units) {
                const n = Math.random() + 10
                const i = `${n.toFixed(2)}${unit}`;
                const e = unit;
                const r = convertHandler.getUnit(i);
                assert.strictEqual(r, e);
                assert.typeOf(r, "string");
            }
        });
        test("convertHandler should correctly return an error for an invalid input unit", function() {
            const i = "1unit";
            assert.throws(function() {
                convertHandler.getUnit(i);
            }, Error)
        });
        test("convertHandler should return the correct return unit for each valid input unit", function() {
            const units = ["gal", "lbs", "mi"];
            const eUnits = ["L", "Kg", "Km"];
            for (const [index, unit] of units.entries()) {
                const n = Math.random() + 10;
                const i = `${n.toFixed(2)}${unit}`;
                const e = `${eUnits[index]}`;
                const r = convertHandler.getReturnUnit(i);
                assert.strictEqual(e, r);
                assert.typeOf(r, "string");
            }
        });
        test("convertHandler should correctly return the spelled-out string unit for each valid input", function() {
           const units = [ "L", "Kg", "Km", "gal", "lbs", "mi" ];
           const spelled = [ "liter", "kilograms", "kilometers", "gallons", "pounds", "miles" ];
           for(const [index, unit] of units.entries() ) {
               const r = convertHandler.spellOutUnit(unit);
               assert.strictEqual(r, spelled[index]);
               assert.typeOf(r, "string");
           }
        });
    });
    suite("ConvertHandler conversion", function() {
        test("convertHandler should correctly convert gal to L", function() {
            const n = Math.random() + 10;
            const u = "gal";
            const galToL = 3.78541;
            const r = convertHandler.convert(n, u);
            const e = Number((n * galToL).toFixed(5));
            assert.strictEqual(r, e);
            assert.typeOf(r, "number");
        });
        test("convertHandler should correctly convert L to gal", function() {
            const n = Math.random() + 10;
            const u = "L";
            const galToL = 3.78541;
            const r = convertHandler.convert(n, u);
            const e = Number((n * (1 / galToL)).toFixed(5));
            assert.strictEqual(r, e);
            assert.typeOf(r, "number");
        });
        test("convertHandler should correctly convert mi to km", function() {
            const n = Math.random() + 10;
            const u = "mi";
            const miToKm = 1.60934;
            const r = convertHandler.convert(n, u);
            const e = Number((n * miToKm).toFixed(5));
            assert.strictEqual(r, e);
            assert.typeOf(r, "number");
        });
        test("convertHandler should correctly convert km to mi", function() {
            const n = Math.random() + 10;
            const u = "Km";
            const miToKm = 1.60934;
            const r = convertHandler.convert(n, u);
            const e = Number((n * (1 / miToKm)).toFixed(5));
            assert.strictEqual(r, e);
            assert.typeOf(r, "number");
        });
        test("convertHandler should correctly convert lbs to kg", function() {
            const n = Math.random() + 10; 
            const u = "lbs";
            const lbsToKg = 0.453592;
            const r = convertHandler.convert(n, u);
            const e = Number((n * lbsToKg).toFixed(5));
            assert.strictEqual(r, e);
            assert.typeOf(r, "number");
        });
        test("convertHandler should correctly convert Kg to lbs", function() {
            const n = Math.random() + 10; 
            const u = "Kg";
            const lbsToKg = 0.453592;
            const r = convertHandler.convert(n, u);
            const e = Number((n * (1 / lbsToKg)).toFixed(5));
            assert.strictEqual(r, e);
            assert.typeOf(r, "number");
        });
        test("convertHandler should correctly convert kg to lbs", function() {
            const n = Math.random() + 10; 
            const u = "kg";
            const lbsToKg = 0.453592;
            const r = convertHandler.convert(n, u);
            const e = Number((n * (1 / lbsToKg)).toFixed(5));
            assert.strictEqual(r, e);
            assert.typeOf(r, "number");
        });
    })
});
