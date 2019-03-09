
'use strict'

var request = require('request');
let anchor_url="http://localhost:3000/notifyEvent"

exports.log_event = function(jobid, type, message) {

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


#exports.log_event("12", "log", "verify handler");
