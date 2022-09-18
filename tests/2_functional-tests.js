const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');
const { v4: uuidv4 } = require('uuid');

chai.use(chaiHttp);

const _id = uuidv4();

suite('Functional Tests', function() {
    test("POST request to /api/issues/apitest/ with no body.", function(done) {
        chai
            .request(server)
            .post('/api/issues/apitest/')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({})
            .end(function( _, res) {
                assert.equal(res.status, 200, 'Reponse status should be 200 OK');
                const json = JSON.parse(res.text);
                assert.equal(json.error, 'required field(s) missing');
                done();
           });
    });
    test("Create an issue with every field:\n\tPOST request to /api/issues/apitest2/", function(done) {
        const form = {
            issue_title: 'test',
            issue_text: 'test',
            created_by: 'test',
            assigned_to: 'test',
            status_text: 'test',
            _id,
        };
        chai
            .request(server)
            .post('/api/issues/apitest2/')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send(form)
            .end(function(_, res) {
                assert.equal(res.status, 200, 'Reponse status should be 200 OK');
                const json = JSON.parse(res.text);
                assert.equal(form.issue_title, json.issue_title);
                assert.equal(form.issue_text, json.issue_text);
                assert.equal(form.created_by, json.created_by);
                assert.equal(form.assigned_to, json.assigned_to);
                assert.equal(form.status_text, json.status_text);
                done();
           });
    });
    test("Create an issue with every field:\n\tPOST request to /api/issues/apitest/", function(done) {
        const form = {
            issue_title: 'test',
            issue_text: 'test',
            created_by: 'test',
            assigned_to: 'test',
            status_text: 'test',
            _id,
        };
        chai
            .request(server)
            .post('/api/issues/apitest/')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send(form)
            .end(function(_, res) {
                assert.equal(res.status, 200, 'Reponse status should be 200 OK');
                const json = JSON.parse(res.text);
                assert.equal(form.issue_title, json.issue_title);
                assert.equal(form.issue_text, json.issue_text);
                assert.equal(form.created_by, json.created_by);
                assert.equal(form.assigned_to, json.assigned_to);
                assert.equal(form.status_text, json.status_text);
                done();
           });
    });
    test("Create an issue with every field:\n\tPOST request to /api/issues/apitest/", function(done) {
        const form = {
            issue_title: 'test',
            issue_text: 'test',
            created_by: 'test',
            assigned_to: 'test',
            status_text: 'test',
            _id,
        };
        chai
            .request(server)
            .post('/api/issues/apitest/')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send(form)
            .end(function(_, res) {
                assert.equal(res.status, 200, 'Reponse status should be 200 OK');
                const json = JSON.parse(res.text);
                assert.equal(form.issue_title, json.issue_title);
                assert.equal(form.issue_text, json.issue_text);
                assert.equal(form.created_by, json.created_by);
                assert.equal(form.assigned_to, json.assigned_to);
                assert.equal(form.status_text, json.status_text);
                done();
           });
    });
    test("Create an issue with required fields:\n\t POST request to /api/issues/apitest/", function(done) {
        const form = {
            issue_title: 'test',
            issue_text: 'test',
            created_by: 'drGeo',
            assigned_to: 'Joe'
        };
        chai
            .request(server)
            .post('/api/issues/apitest/')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send(form)
            .end(function(_, res) {
                assert.equal(res.status, 200, 'Reponse status should be 200 OK');
                const json = JSON.parse(res.text);
                assert.equal(form.issue_title, json.issue_title);
                assert.equal(form.issue_text, json.issue_text);
                assert.equal(form.created_by, json.created_by);
                done();
           });
    });
    test("View issues on a project: GET request to /api/issues/{project}", function(done) {
        chai
            .request(server)
            .get('/api/issues/apitest/')
            .end(function(_, res) {
                assert.equal(res.status, 200, 'Reponse status should be 200 OK');
                const issues = JSON.parse(res.text);
                assert.notEqual(issues.length, 0, "Should not be empty");
                done();
           });
    });
    test("View issues on a project with one filter: \n\tGET request to /api/issues/{project}?open=true", function(done) {
        chai
            .request(server)
            .get('/api/issues/apitest/?open=true')
            .end(function(_, res) {
                assert.equal(res.status, 200, 'Reponse status should be 200 OK');
                const issues = JSON.parse(res.text);
                assert.equal(issues.length, 3);
                done();
           });
    });
    test("View issues on a project with multiple filters: \n\tGET request to /api/issues/{project}?opentrue&assigned_to=Joe", function(done) {
        chai
            .request(server)
            .get('/api/issues/apitest/?open=true&assigned_to=Joe')
            .end(function(_, res) {
                assert.equal(res.status, 200, 'Reponse status should be 200 OK');
                const issues = JSON.parse(res.text);
                assert.equal(issues.length, 1)
                done();
           });
    });
    test("Update one field on an issue:\n\tPUT request to /api/issues/{project}", function(done) {
        const form = {
            _id,
            issue_title: 'updated',
        };
        chai
            .request(server)
            .put('/api/issues/apitest/')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send(form)
            .end(function(_, res) {
                assert.equal(res.status, 200, 'Reponse status should be 200 OK');
                const json = JSON.parse(res.text);
                const resID = json._id;
                assert.equal(_id, resID );
                done();
           });
    });
    test("Update multiple fields on an issue:\n\tPUT request to /api/issues/{project}", function(done) {
        const form = {
            _id,
            issue_title: 'updated',
            issue_text: 'updated test',
            created_by: 'Lev',
            assigned_to: 'Jones',
            open: false
        };
        chai
            .request(server)
            .put('/api/issues/apitest/')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send(form)
            .end(function(_, res) {
                assert.equal(res.status, 200, 'Reponse status should be 200 OK');
                const json = JSON.parse(res.text);
                const resID = json._id;
                assert.equal(_id, resID );
                done();
           });
    });
    test("Update an issue with missing _id:\n\tPUT request to /api/issues/{project}", function(done) {
        const form = {
            issue_title: 'updated',
            issue_text: 'updated test',
            created_by: 'Lev',
            assigned_to: 'Jones',
            open: false
        };
        chai
            .request(server)
            .put('/api/issues/apitest/')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send(form)
            .end(function(_, res) {
                assert.equal(res.status, 200, 'Reponse status should be 200 OK');
                const { error } = JSON.parse(res.text);
                assert.equal(error, 'missing required field _id');
                done();
           });
    });
    test("Update an issue with missing _id:\n\tPUT request to /api/issues/{project}", function(done) {
        const form = {
            _id: "123-123-123",
            issue_title: 'updated',
            issue_text: 'updated test',
            created_by: 'Lev',
            assigned_to: 'Jones',
            open: false
        };
        chai
            .request(server)
            .put('/api/issues/apitest/')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send(form)
            .end(function(_, res) {
                assert.equal(res.status, 200, 'Reponse status should be 200 OK');
                const { error } = JSON.parse(res.text);
                assert.equal(error, 'issue _id not found');
                done();
           });
    });
    test("Update an issue with no fields to update:\n\tPUT request to /api/issues/{project}", function(done) {
        const form = {
            _id,
        };
        chai
            .request(server)
            .put('/api/issues/apitest/')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send(form)
            .end(function(_, res) {
                assert.equal(res.status, 200, 'Reponse status should be 200 OK');
                const json = JSON.parse(res.text);
                assert.equal(_id, json._id);
                done();
           });
    });
    test("Delete an issue:\n\tDELETE request to /api/issues/{project}", function(done) {
        const form = {
            _id,
        };
        chai
            .request(server)
            .delete('/api/issues/apitest/')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send(form)
            .end(function(_, res) {
                assert.equal(res.status, 200, 'Reponse status should be 200 OK');
                const json = JSON.parse(res.text);
                assert.equal(_id, json._id);
                done();
           });
    });
    test("Delete an issue with an invalid _id:\n\tDELETE request to /api/issues/{project}", function(done) {
        const form = {
            _id: "123-123",
        };
        chai
            .request(server)
            .delete('/api/issues/apitest/')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send(form)
            .end(function(_, res) {
                assert.equal(res.status, 200, 'Reponse status should be 200 OK');
                const { error } = JSON.parse(res.text);
                assert.equal(error, "issue _id not found");
                done();
           });
    });
    test("Delete an issue with missing _id:\n\tDELETE request to /api/issues/{project}", function(done) {
        const form = {};
        chai
            .request(server)
            .delete('/api/issues/apitest/')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send(form)
            .end(function(_, res) {
                assert.equal(res.status, 200, 'Reponse status should be 200 OK');
                const { error } = JSON.parse(res.text);
                assert.equal(error, "missing required field _id");
                done();
           });
    });
});
