
'use strict';

require('body-parser');


//wss = require('server.js').websocketServer;
//wss = require('server.js').websocketServer;
exports.notify_event = function(req, res) {
    //Write to DB, send notifications to active websockets

    //TODO store in DB
   global.db.run(`INSERT INTO events(event) VALUES(?)`, [JSON.stringify(req.body)], function(err) {
        if (err) {
          return console.log(err.message);
        }
    // get the last insert id
        console.log(`A row has been inserted with rowid ${this.lastID}`);
   });
    //websocketServer
    global.wss.clients.forEach(function each(client) {
      //client.send("broadcast: spanner updated");
      client.send(JSON.stringify(req.body));
      //client.send("notification:"+JSON.stringify(req.body));
    });
    //console.log(req.body);
    res.json('{"status":"Done"}')
};



exports.invoke_action = function(req, res) {
    res.json('{"invoking":"Action"}')
};

/*
db.close((err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Close the database connection.');
});

*/

