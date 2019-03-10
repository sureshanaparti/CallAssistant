'use strict';

const request = require("request");
var require = require("body-parser");
global.flag = 1;
global.error ="";


global.resResult = "Test-String";
global.caller1name= "Bharath Kumar";
global.caller1email = "bharat.kumar@persistent.co.in";
global.caller2name= "HariKrishna Patnala";
global.caller2email = "harikrishna.patnala@persistent.co.in";
global.location = 'Hyd-WaveRock-11th Floor Paramahamsa (Projector)';
global.starttime = "2019-03-11T12:00:00";
global.endtime = "2019-03-11T11:00:00";
global.subject = "Meeting Created as per the transcirptit :- 7eb361fc-4274-11e9-b210-d663bd873d93";
global.jobid="7eb361fc-4274-11e9-b210-d663bd873d93";
global.attendeeslist="bharat,hari";



// Create the hashmap
global.userHash = {};
// Add keys to the hashmap
global.userHash['pavan'] = {name:'Pavan Kumar Aravapalli',email:'pavankumar_a@persistent.co.in'};
global.userHash['hari'] = {name:'Hari Krishna Patnala',email:'harikrishna.patnala@persistent.co.in'};
global.userHash['suresh'] = {name:'Suresh Sadhu',email:'suresh.sadhu@persistent.co.in'};
global.userHash['srinivas'] = {name:'Srinivas Gandikota',email:'srinivas.gandikota@persistent.co.in'};
global.userHash['anaparti'] = {name:'Suresh Anaparti',email:'suresh.anaparti@persistent.co.in'};
global.userHash['bharat'] = {name:'Bharat Kumar',email:'bharat.kumar@persistent.co.in'};


global.locatinHash = {};
// Add keys to the hashmap
global.locatinHash['mahavakya'] = {name:'Hyd-WaveRock-11th Floor Mahavakya (Projector, Telepresence)'};
global.locatinHash['paramahamsa'] = {name:'Hyd-WaveRock-11th Floor Paramahamsa (Projector)'};
global.locatinHash['rudraksha'] = {name:'Hyd-WaveRock-11th Floor Rudraksha (Projector)'};
global.locatinHash['nirvana'] = {name:'Hyd-WaveRock-11th Floor Nirvana (Projector)'};
global.locatinHash['kena'] = {name:'Hyd-WaveRock-11th Floor Kena'};


global.token="Bearer eyJ0eXAiOiJKV1QiLCJub25jZSI6IkFRQUJBQUFBQUFDRWZleFh4amFtUWIzT2VHUTRHdWd2bVpMdlZaWmNVZWdCM0w3ZzJCS2wzdmF2ZElfTUVJMGtTd3FaZ2YxRDZlZFQ2RzVNMkVlZ3FqU1ZaMlIwcVlfUHo3dV8xQzlhOVNUcVFTTi12RjRJZUNBQSIsImFsZyI6IlJTMjU2IiwieDV0IjoiTi1sQzBuLTlEQUxxd2h1SFluSFE2M0dlQ1hjIiwia2lkIjoiTi1sQzBuLTlEQUxxd2h1SFluSFE2M0dlQ1hjIn0.eyJhdWQiOiJodHRwczovL2dyYXBoLm1pY3Jvc29mdC5jb20iLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC8xZjRiZWFjZC1iN2FhLTQ5YjItYWFhMS1iODUyNWNiMjU3ZTAvIiwiaWF0IjoxNTUyMTg1MDMwLCJuYmYiOjE1NTIxODUwMzAsImV4cCI6MTU1MjE4ODkzMCwiYWNjdCI6MCwiYWNyIjoiMSIsImFpbyI6IkFTUUEyLzhLQUFBQTllTHdwaHpPdi91b01qZUtXTmhoa04wQWJXb3RRZ2I2cHc2NVNoSmE1ZDA9IiwiYW1yIjpbInB3ZCJdLCJhcHBfZGlzcGxheW5hbWUiOiJiaXR0dWFwcCIsImFwcGlkIjoiYWQ0Y2Y0NGYtZjRjMC00MjAzLTgyNzktNDNiZDcwMGY5NWUzIiwiYXBwaWRhY3IiOiIxIiwiZmFtaWx5X25hbWUiOiJBcmF2YXBhbGxpIiwiZ2l2ZW5fbmFtZSI6IlBhdmFuIEt1bWFyIiwiaXBhZGRyIjoiMTE1LjExNC45My42NyIsIm5hbWUiOiJQYXZhbiBLdW1hciBBcmF2YXBhbGxpIiwib2lkIjoiM2EwNDNjZWYtZTBiMi00ODk0LWJkOGUtNTVlNWFhM2QxZTVlIiwib25wcmVtX3NpZCI6IlMtMS01LTIxLTIwMDA0NzgzNTQtMjk5NTAyMjY3LTcyNTM0NTU0My0xOTEyMjAiLCJwbGF0ZiI6IjUiLCJwdWlkIjoiMTAwMzdGRkU5RDI5REMyRSIsInNjcCI6IkNhbGVuZGFycy5SZWFkIENhbGVuZGFycy5SZWFkLlNoYXJlZCBDYWxlbmRhcnMuUmVhZFdyaXRlIENhbGVuZGFycy5SZWFkV3JpdGUuU2hhcmVkIENvbnRhY3RzLlJlYWQgTWFpbC5SZWFkIG9wZW5pZCBwcm9maWxlIFVzZXIuUmVhZCBlbWFpbCIsInNpZ25pbl9zdGF0ZSI6WyJpbmtub3dubnR3ayIsImttc2kiXSwic3ViIjoiamwxS1J5UzhQSVJnSUxsQTlSWXVLQkFzRjZKSXB5LWFUN1NqdndvZ01vWSIsInRpZCI6IjFmNGJlYWNkLWI3YWEtNDliMi1hYWExLWI4NTI1Y2IyNTdlMCIsInVuaXF1ZV9uYW1lIjoicGF2YW5rdW1hcl9hQHBlcnNpc3RlbnQuY28uaW4iLCJ1cG4iOiJwYXZhbmt1bWFyX2FAcGVyc2lzdGVudC5jby5pbiIsInV0aSI6InU5WUFPallRTmtDLVV0aVZ3OHBoQUEiLCJ2ZXIiOiIxLjAiLCJ4bXNfc3QiOnsic3ViIjoiRmJSNEswNXV0T09FU3dDWFMtNjZCaHVtYmlsdlpGVzBjbTNIR0NQQ09sdyJ9LCJ4bXNfdGNkdCI6MTM3MDU5MjU2NH0.iwdQtbv6dE_jApOSilmgQkGpBedlMuykOpA5ry7DG_NQfpNNJjFUu9-1tRUMqxrvI3pA7k0j8aRSSD5ujKWQ-deVrEBiKzBtpwdrWvLW2_bwUGSsBIvG7m5mLCbT-1t3ve9-P-JCmQltFa74meYGwnh1W5EZ2a_408d7Isf3Rb6LYJ4bkFrLXM90THQ4kbWGn3lq6yAd5Abd2an76tPghDuRTcdwDS6qshkvID6vYw2cO_pnp7HU1rsNXPliZLd1Z5KmfoOJ1ctOYLfS-Op-CwzD9qfY42vsIJ2jti_5LvXhpeBAOCgan-QY7kqLPmPZ4mCU_dZYJzlJCN9GRLUZUA";

//var mongoose = require('mongoose'),
  //Task = mongoose.model('Tasks');

exports.list_all_tasks = function(req, res) {
  /*Task.find({}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });*/
};



exports.create_a_task = function(req, res) {
  //var new_task = new Task(req.body);
  //res.json("You are about hit Create Event ....");
    
    
    console.log("Inside create_a_task function call")
    
    var input = req.body;
    console.log("Below is input params given by invoker...");
    console.log(input)
    console.log("Below is input params given by invoker...2");
    
    
    
    if( req.body.attendees !== undefined && req.body.attendees !== null ){
        var words = req.body.attendees.split(',');
        if(words.length>1) {
            for(var i =0;i<words.length;i++){
                if( words[i] !== undefined && words[i] !== null ){
                    var val = global.userHashSerach(words[i].toLowerCase())
                    if( val && i==0){
                        console.log("setting caller1---");
                        global.caller1name = val.name;
                        global.caller1email = val.email;
                        console.log(val.name,val.email);
                    }
                    if( val && i==1){
                        console.log("setting caller2---");
                        global.caller2name = val.name;
                        global.caller2email = val.email;
                        console.log(val.name,val.email);
                    }

                } 
            }
            } /*else if(words.length ==1){
                if( words[0] !== undefined && words[0] !== null ){
                        var val = global.userHashSerach(words[0])
                        if( val && i==0){
                            console.log("setting caller1---***");
                            global.caller1name = val.name;
                            global.caller1email = val.email;
                            console.log(val.name,val.email);
                        }

            }*/
    }

        
    
     //set the params 
    if( req.body.location !== undefined && req.body.location !== null ){
        var val2 = global.locationHashSerach(req.body.location.toString().toLowerCase())
        if( val2){
            console.log("setting location---");
            global.location = val2.name.toString();;
            console.log(val2.name);
        }
        
    }
    
    if( req.body.jobid !== undefined && req.body.jobid !== null ){
        global.jobid = req.body.jobid.toString();
    }
        
    if( req.body.starttime !== undefined && req.body.starttime !== null ){
    global.starttime = req.body.starttime.toString();
    }
    
    if( req.body.endtime !== undefined && req.body.endtime !== null ){    
    global.endtime = req.body.endtime.toString();
    }
    if( req.body.subject !== undefined && req.body.subject !== null ){    
        global.subject = req.body.subject.toString();
    } else {
        global.subject = "Meeting Created as per the Conversation " + global.jobid;
    }
    
    
    // setting outlook post event params 
    options_createEvent.body.attendees["0"].emailAddress.address = global.caller1email;
    options_createEvent.body.attendees["0"].emailAddress.name = global.caller1name;
    options_createEvent.body.attendees["1"].emailAddress.name = global.caller2email;
    options_createEvent.body.attendees["1"].emailAddress.name = global.caller2name;
    options_createEvent.body.location.displayName = global.location;
    options_createEvent.body.start.dateTime = global.starttime;
    options_createEvent.body.end.dateTime = global.endtime;
    options_createEvent.body.subject = global.subject;
    
    /*caller1name = JSON.stringify(req.body.caller1name);
    caller2name = JSON.stringify(req.body.caller2name);
    caller1email = JSON.stringify(req.body.caller1email);
    caller2email = JSON.stringify(req.body.caller2email);*/
    console.log("Below is input params given by invoker...3");
    console.log(caller1email);
    
    console.log("Below is input params given by invoker...4");
    
    
    console.log(starttime);
    console.log("Below is input params given by invoker...5");
      
    
    
    
     console.log(options_createEvent);
    console.log("  ====== > ", options_createEvent.body.attendees["0"].emailAddress);
    console.log("  ====== > ", options_createEvent.body.location);
    global.log_event(global.jobid, "log", "scheduling meeting based on conversation..");
  request(options_createEvent, function (error, response, body) {
      console.log("inside post fire ");
  if (error) {
      global.flag = 0;
      throw new Error(error);
  }

      
      resResult = body;
      console.log("inside post fire2 ");
      console.log(resResult);
      
});
   
    //if(global.falg == 1) {
        global.log_event(global.jobid, "log", 'Meeting created for attendees ['+options_createEvent.body.attendees["0"].emailAddress.address+','+options_createEvent.body.attendees["1"].emailAddress.address+']'+' Organizer : [pavankumar_a@persistent.co.in]'+ ' Location: ['+options_createEvent.body.location.displayName+']' + 'start time : ['+options_createEvent.body.start.dateTime+']'+ ' end time : ['+options_createEvent.body.end.dateTime + ']'+'Agenda :['+options_createEvent.body.subject+']');
        global.flag = 0;
   /* } else {
        global.log_event(global.jobid, "error", "OutLook API :- Access token has expired, Please reach out Admin for renewal");
        global.flag = 1;
        
    }*/

    
    res.json(resResult);
};





var options = { method: 'GET',
  url: 'https://graph.microsoft.com/v1.0/me',
  headers: 
   { Authorization: token,
     'Content-Type': 'application/json' },
  body: { },
  json: true };




var options_createEvent = { method: 'POST',
  url: 'https://graph.microsoft.com/v1.0/me/calendars/AQMkADJhODU1ADM0ZC04MDkyLTQ2NgEtYjY1Ni1kNGJhMjEzODIwMWYARgAAA5Bxm_DTmvRJm1dz81SKMtYHAH0bmiUUShNEtnPzrwz8odoAAAIBBgAAAH0bmiUUShNEtnPzrwz8odoAAAI2PQAAAA==/events',
  headers: 
   { Authorization: token,
     'Content-Type': 'application/json' },
  body: { 
     subject: 'Let\'s go for Movie229',
     body: { contentType: 'HTML', content: 'Meeting Agenda' },
     start: 
      { dateTime: global.starttime,
        timeZone: 'India Standard Time' },
     end: 
      { dateTime: global.endtime,
        timeZone: 'India Standard Time' },
     location: { displayName: 'Hyd-WaveRock-11th Floor Paramahamsa (Projector)' }, 
     attendees: 
      [ { emailAddress: 
           { address:  global.caller1email ,
             name:  global.caller1name },
          type: 'required' },
       { emailAddress: 
           { address:  global.caller2email ,
             name:  global.caller2name },
          type: 'required' }
      /*[ { emailAddress: 
           { address: 'suresh.sadhu@persistent.co.in',
             name: 'Suresh Sadhu' },
          type: 'required' },
       { emailAddress: 
           { address: 'suresh.anaparti@persistent.co.in',
             name: 'Suresh Anaparti' },
          type: 'required' }*/
      ] },
  
  json: true };






/*request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});*/


exports.read_a_task = function(req, res) {
 
};


exports.update_a_task = function(req, res) {
  
};


global.userHashSerach = function(usreName)   {
    if( usreName in global.userHash) {
        return global.userHash[usreName];
    }    
}; 

global.locationHashSerach = function(location2)   {
    if( location2 in global.locatinHash) {
        console.log("================");
        console.log(global.locatinHash[location2]);
        return global.locatinHash[location2];
    }    
}; 
    
let anchor_url="http://localhost:3000/notifyEvent"

global.log_event = function(jobid, type, message) {
    console.log("Function called ---->",log_event);
    console.log("Message passed ---->",message.message);

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
    
    
exports.delete_a_task = function(req, res) {


    
  
    
  
};