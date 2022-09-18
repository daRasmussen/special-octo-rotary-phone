'use strict';

const { v4: uuidv4 } = require("uuid");

const projects = [
    {
        projectId: uuidv4(),
        name: "apitest",
        issues: []
    }
];

const getIssues = (name) => projects.find(p => p.name === name).issues;

const getProject = (name) => projects.find(p => p.name === name); 

const validBody = (body) => {
    try {
        return body.issue_title && body.issue_text && body.created_by; 
    } catch(e) {
        // TODO: add logger 
        // console.log('Invalid body, body is: ', body);
        return false;
    }
}

const check = (issue, k, v) => issue[k].toString() === v; 

const multiFilter = (issues, k, v) => {
    let r;
    for ( let i = 0; i < k.length; i++ ) {
        if( i === 0 ) {
            r = issues.filter((issue) => check(issue, k[i], v[i]));
        } else {
            r = r.filter((issue) => check(issue, k[i], v[i]))
        }
    }
    return r;
}

module.exports = function (app) {

  app.route('/api/issues/:project')
  
    .get(function (req, res){
      const project = getProject(req.params.project);
    
      if (!project) {
          return res.json({ error: 'project not found!' });
      }

      const issues = getIssues(project.name);
      if ( Object.keys(req.query).length === 0 ) {
          return res.json(issues);
      }
      const k = Object.keys(req.query);
      const v = Object.values(req.query);
      const ans = multiFilter(issues, k, v);
      return res.json(ans);
    })
    
    .post(function (req, res) {
      const project = getProject(req.params.project);
    
      if (!project) {
          return res.json({ error: 'project not found!' });
      }

      if (!validBody(req.body)) {
          return res.json({ error: 'required field(s) missing' })      
      }

      const ans = {
            assigned_to: req.body.assigned_to,
            status_text: req.body.status_text,
            issue_title: req.body.issue_title,
            issue_text: req.body.issue_text,
            created_by: req.body.created_by,
            open: true,
            _id: req.body._id || uuidv4(),
            created_on: new Date(Date.now()),
            updated_on: new Date(Date.now())
      };
      const issues = getIssues(project.name);
      issues.push(ans);
      return res.json(ans);
    })
    
    .put(function (req, res){
      const project = getProject(req.params.project);
    
      if (!project) {
          return res.json({ error: 'project not found!' });
      }

      if (!req.body._id) {
          return res.json({ error: 'missing required field _id' });
      }
      
      const issues = getIssues(project.name);
      const issue = issues.filter(issue => issue._id === req.body._id);
      if(issue.length === 0) {
          return res.json({ error: 'issue _id not found' })
      }
      const keys = Object.keys(req.body);
      for (const key of keys) {
          issue[key] = req.body[key];
      }
      const { _id } = issue;
      const r = { result: "successfully updated", _id  };
      return res.json(r);
    })
    
    .delete(function (req, res){
      const project = getProject(req.params.project);
    
      if (!project) {
          return res.json({ error: 'project not found!' });
      }

      if (!req.body._id) {
          return res.json({ error: 'missing required field _id' });
      }
      
      const issues = getIssues(project.name);
      const issue = issues.filter(issue => issue._id === req.body._id);
      if(issue.length === 0) {
          return res.json({ error: 'issue _id not found' })
      }
      const { _id } = issue[0];
      issues.pop(issue);

      const r = { result: "successfully deleted", _id };
      return res.json(r);

    });
    
};
