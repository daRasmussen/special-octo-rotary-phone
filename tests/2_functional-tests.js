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

suite('Functional Tests', function() {

  /*
  * ----[EXAMPLE TEST]----
  * Each test should completely test the response of the API end-point 
  * including response status code!
  */ 
  test('#example Test GET /api/books', async function(){
     const res = await chai.request(server).get("/api/books").send();
     assert.equal(res.status, 200, "response should be 200");
     assert.isArray(res.body, 'response should be an array');
     const [ first ] = res.body;
     assert.property(first, 'commentcount', 'Books in array should contain commentcount');
     assert.property(first, 'title', 'Books in array should contain title');
     assert.property(first, '_id', 'Books in array should contain _id');
  });
  /*
  * ----[END of EXAMPLE TEST]----
  */

  suite('Routing tests', function() {


    suite('POST /api/books with title => create book object/expect book object', function() {
      
      test('Test POST /api/books with title', async function() {
        const res = await chai
              .request(server)
              .post("/api/books")
              .set("Content-Type", "application/json")
              .send({ title: "abc" });
        assert.equal(res.status, 200, "response should be 200");
        assert.isObject(res.body, "response should be an object");
        assert.property(res.body, '_id', "Book should have an _id");
        assert.property(res.body, "title", "Book should have a title");
      });
      
      test('Test POST /api/books with no title given', async function() {
        const res = await chai
              .request(server)
              .post("/api/books")
              .set("content-type", "application/json")
              .send({});
         assert.equal(res.status, 200, "response should be 200");
         assert.isString(res.text, "response should be a string");
         assert.equal(
          res.text, 
          "missing required field title", 
          "response should be a message"
         );
      });
      
    });


    //suite('GET /api/books => array of books', function(){
      
    //  test('Test GET /api/books',  function(done){
    //    //done();
    //  });      
      
    //});


    //suite('GET /api/books/[id] => book object with [id]', function(){
      
    //  test('Test GET /api/books/[id] with id not in db',  function(done){
    //    //done();
    //  });
      
    //  test('Test GET /api/books/[id] with valid id in db',  function(done){
    //    //done();
    //  });
      
    //});


    //suite('POST /api/books/[id] => add comment/expect book object with id', function(){
      
    //  test('Test POST /api/books/[id] with comment', function(done){
    //    //done();
    //  });

    //  test('Test POST /api/books/[id] without comment field', function(done){
    //    //done();
    //  });

    //  test('Test POST /api/books/[id] with comment, id not in db', function(done){
    //    //done();
    //  });
      
    //});

    //suite('DELETE /api/books/[id] => delete book object id', function() {

    //  test('Test DELETE /api/books/[id] with valid id in db', function(done){
    //    //done();
    //  });

    //  test('Test DELETE /api/books/[id] with  id not in db', function(done){
    //    //done();
    //  });

    //});

  });

});
