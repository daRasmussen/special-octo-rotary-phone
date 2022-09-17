const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
    test("Create an issue with every field: POST request to /api/issues/apitest/", function(done) {
        chai
            .request(server)
            .post('/api/issues/apitest/')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({ 
                issue_title: 'test',
                issue_text: 'test',
                created_by: 'test',
                assigned_to: 'assigned_to',
                status_text: 'status_text',
            })
            .end(function( req, res) {
                assert.equal(res.status, 200, 'Reponse status should be 200 OK');
                done();
           });
    });
});
