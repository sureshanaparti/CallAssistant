
"use strict";

const serverPort = 3000,
    http = require("http"),
    express = require("express"),
    app = express(),
    server = http.createServer(app),
    WebSocket = require("ws"),
    websocketServer = new WebSocket.Server({ server });
global.wss = websocketServer;

const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database(':memory:', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the in-memory SQlite database.');
});

db.run('CREATE TABLE events(event text)');

global.db = db;



var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./api/routes/anchorRoutes')
routes(app);

//when a websocket connection is established
websocketServer.on('connection', (webSocketClient) => {
    //send feedback to the incoming connection
    //webSocketClient.send('{ "connection" : "ok"}');

   //send all the events in db
let sql = `SELECT event FROM events`;
db.all(sql, [], (err, rows) => {
  if (err) {
    throw err;
  }
  rows.forEach((row) => {
    console.log(row);
    //webSocketClient.send(JSON.stringify(row));
    webSocketClient.send(row.event);
    
  });
});

    
    //when a message is received
    webSocketClient.on('message', (message) => {

        //for each websocket client
        websocketServer
        .clients
        .forEach( client => {
            //send the client the current message
            client.send(`{ "message" : ${message} }`);
        });
    });
});

//start the web server
server.listen(serverPort, () => {
    console.log(`Websocket server started on port ` + serverPort);
});

