'use strict';

module.exports = function (app) {

  app.route('/api/issues/:project')
  
    .get(function (req, res){
      let project = req.params.project;
      console.log("GET req.body: ", req.body)
      return res.send("ok");
    })
    
    .post(function (req, res){
      const { 
          params: { project }, 
          body 
      } = req;
      const ans = {
            ...body,
            _id: "63263733943c9b0973351b2f",
            created_on: new Date(Date.now()),
            updated_on: new Date(Date.now())
      };
      // console.log(ans);
      // res.json(ans)
      console.log("POST req.body: ", req.body)
      return res.send("ok");
    })
    
    .put(function (req, res){
      let project = req.params.project;
      console.log("PUT req.body: ", req.body)
      return res.send("ok");
    })
    
    .delete(function (req, res){
      let project = req.params.project;
      
      console.log("DELETE req.body: ", req.body)
      return res.send("ok");
    });
    
};
