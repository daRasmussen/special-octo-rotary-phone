/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const dbName = "test";
const collectionName = "books";

const client = new MongoClient(
    process.env.DB, 
    { 
      useNewUrlParser: true, 
      useUnifiedTopology: true, 
      serverApi: ServerApiVersion.v1 
    }
);
const getDBO = () => client.db(dbName);
const getCollection = () => getDBO().collection(collectionName);

module.exports = function (app) {
  app.route('/api/books')
    .get(async function (_, res) {
      // response will be array of book objects
      // json res format: 
      // [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
      await client.connect();
      const c = getCollection();
      const books = await c.find().toArray().then(a => a);
      return res.status(200).json(books);
    })
    .post(async function (req, res){
      const title = req.body?.title || undefined;
      const commentcount = req.body?.commentcount || null;
      // response will contain new book object including at least _id and title
      if (!req.body.hasOwnProperty('title')) {
        return res.status(200).send("missing required field title");
      }
      await client.connect();
      const c = getCollection();
      const inserted = await c.insertOne({ title, commentcount });
      const { insertedId: _id } = inserted;
      return res.status(200).json({ _id, title });
    })
    .delete(async function(_, res){
      // if successful response will be 'complete delete successful'
      await client.connect();
      const c = getCollection();
      try {
        c.deleteMany({});
        res.status(200).send("complete delete successful");
      } catch (e) {
        res.status(500);
      }
    });
  app.route('/api/books/:id')
    .get(async function (req, res){
      const _id = req.params.id;
      // json res format: 
      // {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
      await client.connect();
      const c = getCollection();
      const found = await c.findOne({ "_id": ObjectId(_id) });
      if(found) {
        res.status(200).json(found);
      } else {
        res.status(200).send("no book exists.");
      }
    })
    
    .post(async function(req, res){
      let bookid = req.params.id;
      let comment = req.body.comment;
      //json res format same as .get
      await client.connect();
      const c = getCollection();
      const updated = c.updateOne({ _id: bookid, comment })
      console.log(updated);
      return res.status(200).json(updated);
    })
    
    .delete(function(req, res){
      let bookid = req.params.id;
      //if successful response will be 'delete successful'
    });
  
};
