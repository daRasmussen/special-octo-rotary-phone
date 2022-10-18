/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       
*/

const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);
let _id;
suite('Functional Tests', function() {
  suite('Routing tests', function() {
    suite(
      'POST /api/books with title => create book object/expect book object', 
      function() {
        this.timeout(60000);
        test('Test POST /api/books with title', function(done) {
          chai
            .request(server)
            .post("/api/books")
            .set("Content-Type", "application/json")
            .send({ title: "abc" })
            .end(function(_, res) {
                assert.equal(res.status, 200, "response should be 200");
                assert.isObject(res.body, "response should be an object");
                _id = res.body["_id"];
                assert.property(res.body, '_id', "Book should have an _id");
                assert.property(res.body, "title", "Book should have a title");
                done();
            });
        });
        test('Test POST /api/books with no title given', function(done) {
          chai
            .request(server)
            .post("/api/books")
            .set("content-type", "application/json")
            .send({})
            .end(function(_, res) {
                assert.equal(res.status, 200, "response should be 200");
                assert.isString(res.text, "response should be a string");
                assert.equal(
                    res.text, 
                    "missing required field title", 
                    "response should be a message"
                );
                done();
            });
        });
    });

    suite('GET /api/books => array of books', function() {
      test('Test GET /api/books', function(done) {
        chai
          .request(server)
          .get("/api/books")
          .send()
          .end(function(_, res) {
              assert.equal(res.status, 200, "reponse should be 200");
              assert.isArray(res.body, 'response should be an array');
              for(const book of res.body) {
                assert.isObject(book, "each book should be an object");
                assert.property(book, '_id', "each book should have an _id");
                assert.property(book, "title", "each book should have a title");
                const { _id, title, commentcount } = book;
                assert.isDefined(_id, "each book has an _id");
                assert.isDefined(title, "each book has an title");
                assert.typeOf(
                    title, 
                    "String", 
                    "each book title is of type string"
                );
                assert.isDefined(
                    commentcount, 
                    "each book has a commentcount"
                );
                assert.typeOf(
                    commentcount, 
                    "Number", 
                    "each book commentcount is of type number"
                );
              }
              done();
          });
      });      
    });

    suite('GET /api/books/[id] => book object with [id]', function() {
      test('Test GET /api/books/[id] with id not in db', function() {
        const id = 3;
        chai
          .request(server)
          .get(`/api/books/${id}`)
          .send()
          .end(function(_, res) {
              assert.equal(res.status, 200, "response should be 200");
              assert.equal(
                  res.text, 
                  "no book exists", 
                  "response text should prompt that no book exists"
              );
          });
      });
      test('Test GET /api/books/[id] with valid id in db', function(done) {
        chai
          .request(server)
          .get(`/api/books/${_id}`)
          .send()
          .end(function(_, res) {
            assert.equal(res.status, 200, "response should be 200");
            assert.equal(
                _id, 
                res.body["_id"],
                "reponse has same id that requested"
            );
            assert.isDefined(
                res.body["title"],
                "response has a title"
            );
            assert.isDefined(
                res.body["commentcount"], 
                "reponse has a commentcount"
            );
            assert.isDefined(
                res.body["comments"],
                "response has commments"
            );
            done();
          });
      });
    });

    suite('POST /api/books/[id] => add comment/expect book object with id', 
          function() {
      test('Test POST /api/books/[id] with comment', function(done) {
        chai
          .request(server)
          .post(`/api/books/${_id}`)
          .set("content-type", "application/json")
          .send({ comment: "hej123" })
          .end(function(_, res) {
              assert.equal(res.status, 200, "response should be 200");
              assert.isTrue(
                res.body.hasOwnProperty("comments"), 
                "response has comments property."
              );
              assert.equal(
                res.body.comments.length,
                1,
                "added comment should be of length 1"
              );
              assert.equal(
                res.body.commentcount, 
                res.body.comments.length, 
                "commentscount is the length of number of comments"
              );
              done();
          });
      });
      test('Test POST /api/books/[id] without comment field', 
        function(done) {
          chai
            .request(server)
            .post(`/api/books/${_id}`)
            .set("content-type", "application/json")
            .send({})
            .end(function(_, res) {
                assert.equal(res.status, 200, "response");
                assert.equal(
                    res.text,
                    "missing required field comment",
                    "comment not set should trigger a response"
                );
                done();
            });
      });
      test('Test POST /api/books/[id] with comment, id not in db', 
        function(done) {
          chai
            .request(server)
            .post("/api/books/123")
            .set("content-type", "application/json")
            .set({ "comment": "hej123" })
            .end(function(_, res) {
                assert.equal(res.status, 200, "should responde with status 200");
                assert.equal(
                    res.text,
                    "no book exists",
                    "uknown bookid should trigger a response"
                );
                done();
            });
      });
    });

    suite(
    'DELETE /api/books/[id] => delete book object id', function() {
      test(
      'Test DELETE /api/books/[id] with valid id in db', function(done) {
        chai
          .request(server)
          .delete(`/api/books/${_id}`)
          .send()
          .end(function(_, res) {
              assert.equal(res.status, 200, "should responde with status 200");
              assert.equal(
                  res.text,
                  "delete successful",
                  "should prompt that an book has been deleted"
              );
              done();
          });
      });
      test(
      'Test DELETE /api/books/[id] with id not in db', function(done) {
         chai
          .request(server)
          .delete("/api/books/123")
          .send()
          .end(function(_, res) {
              assert.equal(res.status, 200, "should responde with status 200");
              assert.equal(
                res.text,
                "no book exists",
                "should responde that book does not exists"
              );
              done();
          });
      });
      test(
      'Test DELETE /api/books/ to delete all', function(done) {
        chai
          .request(server)
          .delete("/api/books")
          .send()
          .end(function(_, res) {
              assert.equal(res.status, 200, "should responde with status 200");
              assert.equal(
                res.text,
                "complete delete successful",
                "should prompt that a complete delete has been successful"
              );
              done();
          });
      });
    });
  });
});
