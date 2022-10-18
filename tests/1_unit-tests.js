const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
const solver = new Solver();

suite('Unit Tests', () => {
    test(
    "Logic handles a valid puzzel string of 81 characters", 
    function(done) {
        const valid = "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.."
        assert.equal(
            solver.validate(valid), 
            true, 
            "81 characters should validate to true"
        );
        const invalid = ".9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.."
        assert.equal(
            solver.validate(invalid),
            false,
            "80 charcaters should validate to false"
        );
        done();
    });
    test(
    "Logic handles a puzzle string with invalid characters (not 1-9 or .)",
    function(done) {
        let invalid = "a.9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.."
        assert.equal(
            solver.validate(invalid),
            false,
            "81 characters with illegal charcters should validate to false"
        );
        invalid = "a9..5.1.85.4..,.2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.."
        assert.equal(
            solver.validate(invalid),
            false,
            "80 characters with illegal charcters should validate to false"
        );
        done();
    }
    );
});
