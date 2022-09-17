const chai = require('chai');
const assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

const convertHandler = new ConvertHandler();

const Units = require("../Units.js");
const ui = new Units();

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
            const units = ui.getUnits();
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
            const unitChild = ui.getUnitChild();
            for(const unit of Object.keys(unitChild)) {
                const n = Math.random() + 10;
                const i = `${n.toFixed(2)}${unit}`;
                const e = `${unitChild[unit]}`;
                const r = convertHandler.getReturnUnit(i);
                assert.strictEqual(e, r);
                assert.typeOf(r, "string");
            }
        });
        test("convertHandler should correctly return the spelled-out string unit for each valid input", function() {
           const unitName = ui.getUnitName();
           for(const unit of Object.keys(unitName)) {
               const r = convertHandler.spellOutUnit(unit);
               assert.strictEqual(r, unitName[unit]);
               assert.typeOf(r, "string");
           }
        });
    });
    test("convertHandler should correctly convert gal to L", function() {
        const n = Math.random() + 10;
        const u = "GAL";
        const galToL = 3.78541;
        const r = convertHandler.convert(n, u);
        const e = Number((n * galToL).toFixed(5));
        assert.strictEqual(r, e);
        assert.typeOf(r, "number");
    });
    suite("ConvertHandler conversion", function() {
        const galToL = 3.78541;
        const miToKm = 1.60934;
        const lbsToKg = 0.453592;
        const decimals = 5; 
        const convert = (n, f) => Number((n * f).toFixed(decimals));
        const inverse = (n, f) => Number((n * ( 1 / f)).toFixed(decimals));

        test("convertHandler should correctly convert gal to L", function() {
            const n = Math.random() + 10;
            const u = "gal";
            const r = convertHandler.convert(n, u);
            const e = convert(n, galToL);
            assert.strictEqual(r, e);
            assert.typeOf(r, "number");
        });
        test("convertHandler should correctly convert L to gal", function() {
            const n = Math.random() + 10;
            const u = "L";
            const r = convertHandler.convert(n, u);
            const e = inverse(n, galToL);
            assert.strictEqual(r, e);
            assert.typeOf(r, "number");
        });
        test("convertHandler should correctly convert mi to Km", function() {
            const n = Math.random() + 10;
            const u = "mi";
            const r = convertHandler.convert(n, u);
            const e = convert(n, miToKm);
            assert.strictEqual(r, e);
            assert.typeOf(r, "number");
        });
        test("convertHandler should correctly convert Km to mi", function() {
            const n = Math.random() + 10;
            const u = "Km";
            const r = convertHandler.convert(n, u);
            const e = inverse(n, miToKm);
            assert.strictEqual(r, e);
            assert.typeOf(r, "number");
        });
        test("convertHandler should correctly convert lbs to Kg", function() {
            const n = Math.random() + 10; 
            const u = "lbs";
            const r = convertHandler.convert(n, u);
            const e = convert(n, lbsToKg);
            assert.strictEqual(r, e);
            assert.typeOf(r, "number");
        });
        test("convertHandler should correctly convert Kg to lbs", function() {
            const n = Math.random() + 10; 
            const u = "Kg";
            const r = convertHandler.convert(n, u);
            const e = inverse(n, lbsToKg);
            assert.strictEqual(r, e);
            assert.typeOf(r, "number");
        });
        test("convertHandler should correctly convert units, non case sensetive", function() {
            const units = ui.getUnits();
            const c = {
                lbs: (n) => convert(n, lbsToKg),
                kg: (n) => inverse(n, lbsToKg),
                mi: (n) => convert(n, miToKm),
                km: (n) => inverse(n, miToKm),
                gal: (n) => convert(n, galToL),
                l: (n) => inverse(n, galToL)
            };
            for(const unit of units) {
              const n = Math.random() + 10;
              const r = convertHandler.convert(n, unit);
              const e = c[unit.toLowerCase()](n)
              assert.strictEqual(r, e);
              assert.typeOf(r, "number")
            }
        });
    })
});
