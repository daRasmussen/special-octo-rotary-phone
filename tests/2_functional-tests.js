const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

const Units = require("../Units.js");
const ui = new Units();

suite('Functional Tests', function() {
    suite('GET /api/convert?input=10L', function() {
        test("?input=10L", function(done) {
          const f = 3.78541;
          const v = 10;
          const u = "L";
          const ut = "gal";
          const i = `${v}${u}`;
          const e = (v * (1 / f)).toFixed(5);
          chai
           .request(server)
           .get(`/api/convert/?input=${i}`)
           .end(function(_, res) {
             assert.equal(res.status, 200, 'Reponse status should be 200 OK');
             const { initNum, initUnit, returnUnit, returnNum } = JSON.parse(res.text);
             assert.strictEqual(initNum, v, "InitNum should be 10");
             assert.strictEqual(initUnit, u, "InitUnit should be L");
             assert.strictEqual(returnUnit, ut, "Return value should be gal");
             assert.strictEqual(returnNum, Number(e));
             done();
           });
        });
    });
    suite('GET /api/convert?input=32g', function() {
        test("?input=32g", function(done) {
            const i = `32g`;
            const e = "invalid unit";
            chai
              .request(server)
              .get(`/api/convert/?input=${i}`)
              .end(function(_, res) {
                  assert.equal(res.status, 200, 'Reponse status should be 200 OK');
                  assert.strictEqual(res.text, e, 'Should be able to handle invalid units');
                  done();
              });
        });
    });
    suite('GET /api/convert?input=3/7.2/4kg', function() {
        test("?input=3/7.2/4kg", function(done) {
            const i = "3/7.2/4kg";
            const e = "invalid data";
            chai
              .request(server)
              .get(`/api/convert/?input=${i}`)
              .end(function(_, res) {
                  assert.equal(res.status, 200, 'Reponse status should be 200 OK');
                  assert.strictEqual(res.text, e, 'Should be able to handle invalid units');
                  done();
              });
        });
    });
    suite('GET /api/convert?input=3/7.2/4kilomegagram', function() {
        test("?input=3/7.2/4kg", function(done) {
            const i = "3/7.2/4kilomegagram";
            const e = "invalid number and data";
            chai
              .request(server)
              .get(`/api/convert/?input=${i}`)
              .end(function(_, res) {
                  assert.equal(res.status, 200, 'Reponse status should be 200 OK');
                  assert.strictEqual(res.text, e, 'Should be able to handle invalid units');
                  done();
              });
        });
    });
    suite('GET /api/convert?input=kg', function() {
        test("?input=kg", function(done) {
          const f = 0.453592;
          const u = "kg";
          const ut = "lbs";
          const v = 1;
          const e = (v * (1 / f)).toFixed(5);
          chai
           .request(server)
           .get(`/api/convert/?input=${u}`)
           .end(function(_, res) {
             assert.equal(res.status, 200, 'Reponse status should be 200 OK');
             const json = JSON.parse(res.text);
             assert.strictEqual(json.initNum, v);
             assert.strictEqual(json.initUnit, u);
             assert.strictEqual(json.returnUnit, ut);
             assert.strictEqual(json.returnNum, Number(e));
             done();
           });
        });
    });
    suite('All incoming units should be accepted in both upper and lower case', function() {
        test("?input=allUnits", function(done) {
            const units = ui.getUnits();
            const children = ui.getUnitChild();
            for(const unit of units) {
                const eru = children[unit] !== "L" ? children[unit].toLowerCase() : children[unit];
                const eiu = unit !== "L" ? unit.toLowerCase(): unit;
                chai
                  .request(server)
                  .get(`/api/convert?input=${unit}`)
                  .end(function(_, res) {
                      assert.equal(res.status, 200, 'Response status should be 200 OK');
                      const { initUnit, returnUnit } = JSON.parse(res.text);
                      assert.strictEqual(initUnit, eiu);
                      assert.strictEqual(returnUnit, eru);
                  })
            }
            done();
        });
    });
});
