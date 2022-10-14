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

const books = [
    {
        bookid: 1,
        title: "book1",
        commentcount: 1,
    },
    {
        bookid: 2,
        title: "book2",
        commentcount: 2,
    }
];

const addBook = async (book) => await chai
    .request(server)
    .post("/api/books")
    .set("content-type", "application/json")
    .send(book);

const flush = async () => await chai
    .request(server)
    .delete("/api/books"); 

suite('Functional Tests', function() {
  setup(async function() {
      for(const book of books) {
          await addBook(book);
      };
      const storedBooks = await chai
          .request(server)
          .get("/api/books")
          .send();
      assert.equal(
        storedBooks.body.length, 
        books.length, 
        "should have same length"
      );
      books.map((b) => {
          b["_id"] = storedBooks
              .body
              .filter(
                (sb) => sb["title"] === b["title"]
              )[0]["_id"];
      });
  });
  teardown(async function() {
    await flush();
  });
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
     assert.property(
      first, 
      'commentcount', 'Books in array should contain commentcount'
     );
     assert.property(first, 'title', 'Books in array should contain title');
     assert.property(first, '_id', 'Books in array should contain _id');
  });
  /*
  * ----[END of EXAMPLE TEST]----
  */

  suite('Routing tests', function() {
    suite(
      'POST /api/books with title => create book object/expect book object', 
      function() {
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
    suite('GET /api/books => array of books', function() {
      test('Test GET /api/books',  async function() {
        const res = await chai
              .request(server)
              .get("/api/books")
              .send();
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
      });      
    });
    suite('GET /api/books/[id] => book object with [id]', function() {
      const url = (id) => `/api/books/${id}`;
      test('Test GET /api/books/[id] with id not in db',  async function() {
        const id = 3;
        const res = await chai
          .request(server)
          .get(url(id))
          .send();
        assert.equal(res.status, 200, "response should be 200");
        assert.equal(
          res.text, 
          "no book exists.", 
          "response text should prompt that no book exists"
        );
      });
      test('Test GET /api/books/[id] with valid id in db', async function() {
        const id = books[0]["_id"];
        const res = await chai
          .request(server)
          .get(url(id))
          .send();
        assert.equal(res.status, 200, "response should be 200");
        assert.equal(id, res.body["_id"]);
      });
    });
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
