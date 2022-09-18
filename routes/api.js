'use strict';

const issues = [];

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
      if (!body.issue_title || !body.issue_text || !body.created_by) {
          return res.json({ error: 'required field(s) missing' })
      }
      const ans = {
            assigned_to: body.assigned_to,
            status_text: body.status_text,
            issue_title: body.issue_title,
            issue_text: body.issue_text,
            created_by: body.created_by,
            open: true,
            _id: "63263733943c9b0973351b2f",
            created_on: new Date(Date.now()),
            updated_on: new Date(Date.now())
      };
      issues.push(ans);
      // console.log(ans)
      // console.log("POST req.body: ", req.body)
      return res.json(ans);
    })
    
    .put(function (req, res){
      let project = req.params.project;
      console.log("PUT req.body: ", req.body)
      return res.send("ok");
    })
    
    .delete(function (req, res){
      let project = req.params.project;
      
      console.log("delete req.body: ", req.body)
      return res.send("ok");
    });
    
};
