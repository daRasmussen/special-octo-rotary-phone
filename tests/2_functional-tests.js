const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
    test("Create an issue with every field: POST request to /api/issues/apitest/", function(done) {
        const form = {
            issue_title: 'test',
            issue_text: 'test',
            created_by: 'test',
            assigned_to: '',
            status_text: '',
        };
        chai
            .request(server)
            .post('/api/issues/apitest/')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send(form)
            .end(function( req, res) {
                assert.equal(res.status, 200, 'Reponse status should be 200 OK');
                const json = JSON.parse(res.text);
                assert.equal(form.issue_title, json.issue_title);
                assert.equal(form.issue_text, json.issue_text);
                assert.equal(form.created_by, json.created_by);
                done();
           });
    });
});
