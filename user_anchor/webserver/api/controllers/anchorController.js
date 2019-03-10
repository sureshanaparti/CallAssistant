
'use strict';

require('body-parser');


//wss = require('server.js').websocketServer;
//wss = require('server.js').websocketServer;

var store_event = function(event_info) {

   global.db.run(`INSERT INTO events(event) VALUES(?)`, [event_info], function(err) {
        if (err) {
          return console.log(err.message);
        }
    // get the last insert id
        console.log(`A row has been inserted with rowid ${this.lastID}`);
   });


}

var notify_clients = function(event_info) {

    global.wss.clients.forEach(function each(client) {
      //client.send("broadcast: spanner updated");
      client.send(event_info);
      //client.send("notification:"+JSON.stringify(req.body));
    });


}


exports.notify_event = function(req, res) {
    //Write to DB, send notifications to active websockets

   console.log("Notify Event: ", req.body);
    //store in DB
   store_event(JSON.stringify(req.body));

    //websocketServer
    notify_clients(JSON.stringify(req.body));

    //console.log(req.body);
    res.json('{"status":"Done"}')
};


var request = require('request');
let anchor_url="http://localhost:3002/createEvent"
//let anchor_url="http://10.233.88.74:3002/createEvent"


exports.invoke_action = function(req, res) {
    res.json('{"invoking":"Action"}')


console.log("Invoke Body: ", req.body);

var req_body = req.body.message;
var action = req.body.action;

 console.log("Executing Action ", req_body);
console.log(" Action:: ", req_body.action);

if (action === "meeting") {

//req.body.type = "action";
store_event(JSON.stringify(req.body))
notify_clients(JSON.stringify(req.body));

console.log("Calling Meeting handler");
 request.post(
     anchor_url,
     { json: req_body },
     function (error, response, body) {
         if (!error && response.statusCode == 200) {
             console.log(body);
         }
     }
 );

} else if (action === "jiraBug") {

    req.body.url = "https://issues.accelerite.com/browse/"+req.body.message.id
    req.body.message.subject = "Issue "+req.body.message.id

    store_event(JSON.stringify(req.body))
    notify_clients(JSON.stringify(req.body));

}

};

/*
db.close((err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Close the database connection.');
});

*/

