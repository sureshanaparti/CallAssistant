
'use strict';

require('body-parser');

//wss = require('server.js').websocketServer;
//wss = require('server.js').websocketServer;
exports.notify_event = function(req, res) {
    //Write to DB, send notifications to active websockets

    //TODO store in DB

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
