const chai = require('chai');
const assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

const convertHandler = new ConvertHandler();

const Units = require("../Units.js");
const ui = new Units();

suite('Unit Tests', function(){
    suite("ConvertHandler number input handler", function() {
        test("converHandler should correctly read a whole number input", function(done) {
            const i = 1;
            const r = convertHandler.getNum(i);
            assert.strictEqual(r, i)
            assert.typeOf(i, "number");
            done();
        });
        test("convertHandler should correctly read a decimal number input", function(done) {
            const i = 1.1;
            const r = convertHandler.getNum(i);
            assert.strictEqual(i, r);
            assert.typeOf(i, "number");
            done();
        });
        test("convertHandler should correctly read a fractional input", function(done) {
            const i = "2/2";
            const e = 1; 
            const r = convertHandler.getNum(i);
            assert.notStrictEqual(i, r);
            assert.strictEqual(r, e);
            assert.typeOf(r, "number");
            done();
        });
        test("convertHandler should correctly read a fractional input with a decimal", function(done) {
            const i = "2.0/2.0";
            const e = 1;
            const r = convertHandler.getNum(i);
            assert.notStrictEqual(i, r);
            assert.strictEqual(r, e);
            assert.typeOf(r, "number");
            done();
        });
        test("convertHandler should correctly return an error on a double fraction", function(done) {
            const i = "3/2/3";
            assert.throws(function() {
                convertHandler.getNum(i);
            }, Error);
            done();
        });
        test("convertHandler should correctly default to numerical input of 1 when no input is provided", function(done) {
            const i = "";
            const e = 1; 
            const r = convertHandler.getNum(i);
            assert.strictEqual(r, e);
            done();
        });
    });
    suite("ConverHandler unit input handler", function() {
        test("convertHandler should correctly read each valid input unit.", function(done) {
            const units = ui.getUnits();
            for(const unit of units) {
                const n = Math.random() + 10
                const i = `${n.toFixed(2)}${unit}`;
                const e = unit;
                const r = convertHandler.getUnit(i);
                assert.strictEqual(r, e);
                assert.typeOf(r, "string");
            }
            done();
        });
        test("convertHandler should correctly return an error for an invalid input unit", function(done) {
            const i = "1unit";
            assert.throws(function() {
                convertHandler.getUnit(i);
            }, Error)
            done();
        });
        test("convertHandler should return the correct return unit for each valid input unit", function(done) {
            const unitChild = ui.getUnitChild();
            for(const unit of Object.keys(unitChild)) {
                const n = Math.random() + 10;
                const i = `${n.toFixed(2)}${unit}`;
                const e = `${unitChild[unit]}`;
                const r = convertHandler.getReturnUnit(i);
                assert.strictEqual(e, r);
                assert.typeOf(r, "string");
            }
            done();
        });
        test("convertHandler should correctly return the spelled-out string unit for each valid input", function(done) {
           const unitName = ui.getUnitName();
           for(const unit of Object.keys(unitName)) {
               const r = convertHandler.spellOutUnit(unit);
               assert.strictEqual(r, unitName[unit] + "s");
               assert.typeOf(r, "string");
           }
           done();
        });
    });
    test("convertHandler should correctly convert gal to L", function(done) {
        const n = Math.random() + 10;
        const u = "GAL";
        const galToL = 3.78541;
        const r = convertHandler.convert(n, u);
        const e = Number((n * galToL).toFixed(5));
        assert.strictEqual(r, e);
        assert.typeOf(r, "number");
        done();
    });
    suite("ConvertHandler conversion", function() {
        const galToL = 3.78541;
        const miToKm = 1.60934;
        const lbsToKg = 0.453592;
        const decimals = 5; 
        const convert = (n, f) => Number((n * f).toFixed(decimals));
        const inverse = (n, f) => Number((n * ( 1 / f)).toFixed(decimals));

        test("convertHandler should correctly convert gal to L", function(done) {
            const n = Math.random() + 10;
            const u = "gal";
            const r = convertHandler.convert(n, u);
            const e = convert(n, galToL);
            assert.strictEqual(r, e);
            assert.typeOf(r, "number");
            done();
        });
        test("convertHandler should correctly convert L to gal", function(done) {
            const n = Math.random() + 10;
            const u = "L";
            const r = convertHandler.convert(n, u);
            const e = inverse(n, galToL);
            assert.strictEqual(r, e);
            assert.typeOf(r, "number");
            done();
        });
        test("convertHandler should correctly convert mi to Km", function(done) {
            const n = Math.random() + 10;
            const u = "mi";
            const r = convertHandler.convert(n, u);
            const e = convert(n, miToKm);
            assert.strictEqual(r, e);
            assert.typeOf(r, "number");
            done();
        });
        test("convertHandler should correctly convert Km to mi", function(done) {
            const n = Math.random() + 10;
            const u = "Km";
            const r = convertHandler.convert(n, u);
            const e = inverse(n, miToKm);
            assert.strictEqual(r, e);
            assert.typeOf(r, "number");
            done();
        });
        test("convertHandler should correctly convert lbs to Kg", function(done) {
            const n = Math.random() + 10; 
            const u = "lbs";
            const r = convertHandler.convert(n, u);
            const e = convert(n, lbsToKg);
            assert.strictEqual(r, e);
            assert.typeOf(r, "number");
            done();
        });
        test("convertHandler should correctly convert Kg to lbs", function(done) {
            const n = Math.random() + 10; 
            const u = "Kg";
            const r = convertHandler.convert(n, u);
            const e = inverse(n, lbsToKg);
            assert.strictEqual(r, e);
            assert.typeOf(r, "number");
            done();
        });
        test("convertHandler should correctly convert units, non case sensetive", function(done) {
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
            done();
        });
    });
});

suite( 'Unit Tests 2', ( ) => {
  suite( 'Function convertHandler.getNum(input)', ( ) => {
    test( 'Whole number input', ( done ) => {
      const input = '32L';
      assert.equal( convertHandler.getNum( input ), 32 );
      done(  );
    });
    test( 'Decimal Input', ( done ) => {
      const input = '1.2gal';
      assert.equal( convertHandler.getNum( input ), 1.2 );
      done( );
    } );
    test( 'Fractional Input', ( done ) => {
      const input = '1/2km';
      assert.equal( convertHandler.getNum( input ), 0.5 );
      done( );
    } );
    test( 'Fractional Input w/ Decimal', ( done ) => {
      const input = '5.5/2mi';
      assert.equal( convertHandler.getNum( input ), 2.75 );
      done( );
    } );
    // test( 'Invalid Input (double fraction)', ( done ) => {
    //   const input = '5.5/2/2l';
    //   assert.equal( convertHandler.getNum( input ), null );
    //   done( );
    // } );
    test( 'No Numerical Input', ( done ) => {
      const input = 'lbs';
      assert.equal( convertHandler.getNum( input ), 1 );
      done( );
    } );
  });
  
  suite( 'Function convertHandler.getUnit(input)', ( ) => {
    // test( 'For Each Valid Unit Inputs', ( done ) => {
    //   const input = [ 'gal', 'l', 'mi', 'km', 'lbs', 'kg', 'GAL', 'L', 'MI', 'KM', 'LBS', 'KG' ];
    //   input.forEach( ( el ) => {
    //     assert.equal( convertHandler.getUnit( el ), el.toLowerCase() );
    //   } );
    //   done( );
    // } );
    // test( 'Unknown Unit Input', ( done ) => {
    //   const input = 'whatever';
    //   assert.equal( convertHandler.getUnit( input ), null );
    //   done( );
    // } );  
  });
  
  suite( 'Function convertHandler.getReturnUnit(initUnit)', ( ) => {
    test( 'For Each Valid Unit Inputs', ( done ) => {
      const input  = [ 'gal', 'L', 'mi', 'km', 'lbs', 'kg' ];
      const expect = [ 'L', 'gal', 'km', 'mi', 'kg', 'lbs' ];
      input.forEach( ( el,i ) => {
        assert.equal( convertHandler.getReturnUnit( el ), expect[ i ] );
      } );
      done( );
    } );
  } );
  
  suite( 'Function convertHandler.spellOutUnit(unit)', ( ) => {
    test( 'For Each Valid Unit Inputs', ( done ) => {
      const input  = [ 'gal', 'L', 'mi', 'km', 'lbs', 'kg' ];
      const expect = [ 'gallons', 'liters', 'miles', 'kilometers', 'pounds', 'kilograms' ];
      input.forEach( ( el,i ) => {
        assert.strictEqual( convertHandler.spellOutUnit( el ), expect[ i ] );
      } );
      done( );
    } );

  } );
  
  suite( 'Function convertHandler.convert(num, unit)', ( ) => {

    test( 'Gal to L', ( done ) => {
      var input = [ 5, 'Gal' ];
      var expected = 18.9271;
      assert.approximately(
        convertHandler.convert( input[0], input[1] ),
        expected,
        0.1 // Tolerance
      );
      done( );
    } );

    test( 'L to Gal', ( done ) => {
      var input = [ 6, 'L' ];
      var expected = 1.58503;
      assert.approximately(
        convertHandler.convert( input[0], input[1] ),
        expected,
        0.1 // Tolerance
      );
      done( );
    } );

    test( 'Mi to Km', ( done ) => {
      var input = [ 10, 'Mi' ];
      var expected = 16.0934;
      assert.approximately(
        convertHandler.convert( input[0], input[1] ),
        expected,
        0.1 // Tolerance
      );
      done( );
    } );

    test( 'Km to Mi', ( done ) => {
      var input = [ 2.5, 'Km' ];
      var expected = 1.55343;
      assert.approximately(
        convertHandler.convert( input[0], input[1] ),
        expected,
        0.1 // Tolerance
      );
      done( );
    } );

    test( 'Lbs to Kg', ( done ) => {
      var input = [ 3/3, 'Lbs' ];
      var expected = 0.453592;
      assert.approximately(
        convertHandler.convert( input[0], input[1] ),
        expected,
        0.1 // Tolerance
      );
      done( );
    } );

    test( 'Kg to Lbs', ( done ) => {
      var input = [ 6.3/2, 'Kg' ];
      var expected = 6.944561;
      assert.approximately(
        convertHandler.convert( input[0], input[1] ),
        expected,
        0.1 // Tolerance
      );
      done( );
    } );
  });
});
