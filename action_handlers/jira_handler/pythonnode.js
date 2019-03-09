//var PythonShell = require('python-shell');

var express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
global.resResult = "";
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.listen(3003, () => {
 console.log("Server running on port 3003");
});



let anchor_url="http://localhost:3000/notifyEvent"
 
global.log_event = function(jobid, type, message) {
 
var req_body={ "job_id" : jobid, "type" : type, "source" : "action_handler", "message" : message }
 console.log("Executing log_event");
 
 request.post(
     anchor_url,
     { json: req_body },
     function (error, response, body) {
         if (!error && response.statusCode == 200) {
             console.log(body);
         }
     }
 );
 
}
app.get("/listIssues/", (req, res, next) => {
    console.log("req body -in get ")
    console.log(req.query.id)
    //console.log(global.resResult.body)
    let {PythonShell} = require('python-shell')
	var options = {
	  mode: 'text',
	  pythonPath: '/anaconda2/bin/python',
	  pythonOptions: ['-u'],
	  scriptPath: '.',
	  args: [req.query.id]
	}; 
    PythonShell.run('jira_issues.py', options, function (err, results) {
  	if (err)
    	throw err;

    global.log_event(global.jobid, "log", "search triggered for jira");
  // Results is an array consisting of messages collected during execution
  	console.log('results: %j', results);
  	global.log_event(global.jobid, "log", "results from JIRA: " + results );
});

    });




