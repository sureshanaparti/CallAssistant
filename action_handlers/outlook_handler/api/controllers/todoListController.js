'use strict';

const request = require("request");
var require = require("body-parser");
global.flag = 1;
global.error ="";


global.resResult = "Test-String";
global.caller1name= "Pavan Kumar Aravapalli";
global.caller1email = "pavankumar_a@persistent.co.in";
global.caller2name= "Suresh Sadhu";
global.caller2email = "suresh.sadhu@persistent.co.in";
global.location = 'Hyd-WaveRock-11th Floor Paramahamsa (Projector)';
global.starttime = "2019-03-15T12:00:00";
global.endtime = "2019-03-15T14:00:00";
global.subject = "Meeting Created as per the transcirptit :- 7eb361fc-4274-11e9-b210-d663bd873d93";
global.jobid="7eb361fc-4274-11e9-b210-d663bd873d93";
global.attendeeslist="pavan,suresh";



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


global.token="Bearer eyJ0eXAiOiJKV1QiLCJub25jZSI6IkFRQUJBQUFBQUFDRWZleFh4amFtUWIzT2VHUTRHdWd2eWdlYVhwRUVaNVIxa2Y3Xzh6T1hxSWdhcWI1cm54d1hFSmllTlZVYnFPRFdHelQ4bEcyY2VPcWJkQzFvMTEwZDlBendMbm9lYUhoQ3RVaGFNWXVmY1NBQSIsImFsZyI6IlJTMjU2IiwieDV0IjoiTi1sQzBuLTlEQUxxd2h1SFluSFE2M0dlQ1hjIiwia2lkIjoiTi1sQzBuLTlEQUxxd2h1SFluSFE2M0dlQ1hjIn0.eyJhdWQiOiJodHRwczovL2dyYXBoLm1pY3Jvc29mdC5jb20iLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC8xZjRiZWFjZC1iN2FhLTQ5YjItYWFhMS1iODUyNWNiMjU3ZTAvIiwiaWF0IjoxNTUyMTU2MjM5LCJuYmYiOjE1NTIxNTYyMzksImV4cCI6MTU1MjE2MDEzOSwiYWNjdCI6MCwiYWNyIjoiMSIsImFpbyI6IjQySmdZRGdjeFd1Ly9PQlZNNGRmUVFuVEdLYjRKdC9XVHZuKzkvVTc2eEwxQ3c5U1BPTUIiLCJhbXIiOlsicHdkIl0sImFwcF9kaXNwbGF5bmFtZSI6ImJpdHR1YXBwIiwiYXBwaWQiOiJhZDRjZjQ0Zi1mNGMwLTQyMDMtODI3OS00M2JkNzAwZjk1ZTMiLCJhcHBpZGFjciI6IjEiLCJmYW1pbHlfbmFtZSI6IkFyYXZhcGFsbGkiLCJnaXZlbl9uYW1lIjoiUGF2YW4gS3VtYXIiLCJpcGFkZHIiOiIxMTUuMTE0LjkzLjY3IiwibmFtZSI6IlBhdmFuIEt1bWFyIEFyYXZhcGFsbGkiLCJvaWQiOiIzYTA0M2NlZi1lMGIyLTQ4OTQtYmQ4ZS01NWU1YWEzZDFlNWUiLCJvbnByZW1fc2lkIjoiUy0xLTUtMjEtMjAwMDQ3ODM1NC0yOTk1MDIyNjctNzI1MzQ1NTQzLTE5MTIyMCIsInBsYXRmIjoiNSIsInB1aWQiOiIxMDAzN0ZGRTlEMjlEQzJFIiwic2NwIjoiQ2FsZW5kYXJzLlJlYWQgQ2FsZW5kYXJzLlJlYWQuU2hhcmVkIENhbGVuZGFycy5SZWFkV3JpdGUgQ2FsZW5kYXJzLlJlYWRXcml0ZS5TaGFyZWQgQ29udGFjdHMuUmVhZCBNYWlsLlJlYWQgb3BlbmlkIHByb2ZpbGUgVXNlci5SZWFkIGVtYWlsIiwic2lnbmluX3N0YXRlIjpbImlua25vd25udHdrIiwia21zaSJdLCJzdWIiOiJqbDFLUnlTOFBJUmdJTGxBOVJZdUtCQXNGNkpJcHktYVQ3U2p2d29nTW9ZIiwidGlkIjoiMWY0YmVhY2QtYjdhYS00OWIyLWFhYTEtYjg1MjVjYjI1N2UwIiwidW5pcXVlX25hbWUiOiJwYXZhbmt1bWFyX2FAcGVyc2lzdGVudC5jby5pbiIsInVwbiI6InBhdmFua3VtYXJfYUBwZXJzaXN0ZW50LmNvLmluIiwidXRpIjoibHVCWjJDQlhyay1qNlJJQW0yaGFBQSIsInZlciI6IjEuMCIsInhtc19zdCI6eyJzdWIiOiJGYlI0SzA1dXRPT0VTd0NYUy02NkJodW1iaWx2WkZXMGNtM0hHQ1BDT2x3In0sInhtc190Y2R0IjoxMzcwNTkyNTY0fQ.WfY8vsu_uFdZZt7Qbgy6vExUPziGxjUYwnAut7AZMopxHDeHgc0JO3J5Q7GnFZqB4l-y0bk-3MZ0yJZQ2Z-mZ_3oY3Vqyde5z9fHf1P5D6HiCo9FLj8WKjIu5LYmRNGU1XFkV4Kxv50XSLD1zzhHV6NMCYfYFue1PlMWVgx2E7nb3XyJEx0xqi26EYCacSudwhB5r6sDkCcfR9Sryv8wU6ZcEJpKC89DOhTfYbwG9wn1VlJOPbqWMO8_sK8OK2zA6f7hEKSo6mIBXIHiEMDSbHO6XtD9X-HqmMO8wXoUNsGTWVPHhp66g0gkOZN6jTtIppyBayuRPFTkaWyavYeDSw";

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
   
    if(global.falg == 1) {
        global.log_event(global.jobid, "log", 'Meeting created for attendees ['+options_createEvent.body.attendees["0"].emailAddress.address+','+options_createEvent.body.attendees["1"].emailAddress.address+']'+' Organizer : [pavankumar_a@persistent.co.in]'+ ' Location: ['+options_createEvent.body.location.displayName+']' + 'start time : ['+options_createEvent.body.start.dateTime+']'+ ' end time : ['+options_createEvent.body.end.dateTime + ']'+'Agenda :['+options_createEvent.body.subject+']');
        global.flag = 0;
    } else {
        global.log_event(global.jobid, "error", "OutLook API :- Access token has expired, Please reach out Admin for renewal");
        global.flag = 1;
        
    }

    
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
      { dateTime: '2019-03-15T12:00:00',
        timeZone: 'India Standard Time' },
     end: 
      { dateTime: '2019-03-15T14:00:00',
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