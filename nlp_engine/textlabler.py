#!/usr/bin/python
# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from __future__ import print_function

import json
from wsgiref.simple_server import make_server
import falcon
import spacy
import os
from notifier import notifier
import datetime

#os.sys.path.append('/home/semicolon/coref/bin')

try:
    unicode_ = unicode  # Python 2
except NameError:
    unicode_ = str      # Python 3


class AllResource(object):
    def __init__(self):

        self.textLabler = spacy.load('en_core_web_lg')
        print("nlp resource loaded.")
        self.response = None
        self.notifier = notifier("NLP-analyser")
        self.teamMembers = {"Hari","Bharat","Suresh","Sadhu","Pavan","Srinivas","Lokesh","Alok","Srikanth","Santosh","Tirumala"}
    
    def addAttendees(self, attendees):
        attendeeList = self.meetingDictionary['attendees']
        attendeeList.add(attendees)
        self.meetingDictionary['attendees'] = attendeeList

    def addTicket(self, ticket):
        ticketList = self.ticketDictionary['id']
        ticketList.add('CS-' + ticket)
        self.ticketDictionary['id'] = ticketList

    def timeconvert(self, str1):

        list = str1.split()
        am = ""
        pm = ""
        time = ""
        for item in list:
            if item == 'a.m.':
                am = 'am'
            elif item == 'p.m.':
                pm = 'pm'
            elif item[0].isdigit() == True:
                time = item

        str1 = time + " " + am + pm

        print(str1)
        n=0
        while(str1[n].isdigit()!=True):
            n=n+1

        str1=str1[n:]

        if str1[2:3]!=":":
            str1="0"+str1
        if str1[-2:].lower() == "am" and str1[:2] == "12":
            return "00" + str1[2:-2]
        elif str1[-2:].lower() == "am":
            return str1[:-2].strip() + ":00"
        elif str1[-2:].lower() == "pm" and str1[:2] == "12":
            return str1[:-2]
        else:
            return str(int(str1[:2]) + 12) + str1[2:5]+":00"

    def find_date(self, in_day):
        d=datetime.datetime.now()
        if in_day.lower()=="tomorrow":
            days_ahead=1
            return d + datetime.timedelta(days_ahead)
        if in_day.lower()=="day after tomorrow":
            days_ahead=2
            return d + datetime.timedelta(days_ahead)
        if in_day.lower()=="today":
            return d
        switcher = {

            "monday": 0,
            "tuesday": 1,
            "wednesday": 2,
            "thursday":  3,
            "friday": 4,
            "saturday": 5,
        }
        val=switcher.get(in_day.lower())
        days_ahead = val - d.weekday()
        if days_ahead <= 0:
            days_ahead += 7
        return d + datetime.timedelta(days_ahead)   #2019-03-15T12:00:00   #2019-03-15T12:00:00


    def lableText(self, text, jobid, caller, callee):
        self.actionList = []
        doc = self.textLabler(text)
        print("token.text, token.dep_, token.head.text, token.head.pos_, [child for child in token.children]")
        print("%s" % doc)
        idx = 0
        self.meetingDictionary = {"action":"meeting", "time":None, "date":None, "attendees":set(), "host":None, "webex":None, "location":None}
        self.ticketDictionary = {"action":"jiraBug", "id":set()}

        meetingDetected = False
        ticketDetected = False
        attendeeList = set()
        ticketList = set()
        for token in doc:
            print(token.text, token.dep_, token.head.text, token.head.pos_, [child for child in token.children])

            if token.text == 'ticket':
                ticketDetected = True
            if ticketDetected == True:
                if token.is_digit:
                    ticketList.add(token.text)
                    ticketDetected = False

            if 'subj' in token.dep_:
                if token.text in self.teamMembers:
                    attendeeList.add(token.text)
            if token.text == 'meeting':
                if token.dep_ == 'dobj':
                    if token.head.pos_ == 'VERB':
                        meetingDetected = True
                        required_verb = token.head
                        possible_arguments = required_verb.children
                        print ("required verb label  %s" % possible_arguments)
                    for argument in possible_arguments:
                        if argument.text == 'at':
                            for timeOrPlace in argument.children:
                                if timeOrPlace.text == 'a.m.' or timeOrPlace.text == 'p.m.':
                                   for time in timeOrPlace.children:
                                       self.meetingDictionary['time'] = time.text + " " + timeOrPlace.text
                                       break
                                break
                                nameidentity = self.textLabler(timeOrPlace.text + " " + timeOrPlace.text)
                                if nameidentity is None or nameidentity.ents is None or len(nameidentity.ents) == 0:
                                    self.meetingDictionary["location"] = timeOrPlace.text
                                else:
                                    for ent in nameidentity.ents:
                                        if ent.label_ == 'TIME':
                                            self.meetingDictionary["time"] = timeOrPlace.text
                                        else:
                                            self.meetingDictionary["location"] = timeOrPlace.text
                        elif argument.text == 'on':
                                nameidentity = self.textLabler(timeOrPlace.text + " " + timeOrPlace.text)
                                for ent in nameidentity.ents:
                                    if ent.label_ == 'DATE':
                                        self.meetingDictionary["date"] = timeOrPlace.text
                                        break
                        elif argument.text == 'I' or argument.text == 'me' or argument.text == 'us':
                            whosaidthis = required_verb.head
                            print ("whosaidthis %s" %whosaidthis.text)
                            while whosaidthis.dep_ != 'ROOT':
                                whosaidthis = whosaidthis.head
                            for host in whosaidthis.children:
                                print ("whosaidthis children %s" %host.text)
                                if host.text in self.teamMembers:
                                    self.meetingDictionary["host"] = host.text
                                    self.addAttendees(host.text)
                                    break
                        elif argument.text in self.teamMembers:
                            self.meetingDictionary["host"] = argument.text
                            self.addAttendees(argument.text)
                        else:
                            nameidentity = self.textLabler(argument.text + " " + argument.text)
                            for ent in nameidentity.ents:
                                if ent.label_ == 'DATE':
                                    if self.meetingDictionary["date"] is None:
                                        self.meetingDictionary["date"] = argument.text
                                elif ent.label_ == 'TIME':
                                    if self.meetingDictionary["time"] is None:
                                        self.meetingDictionary["time"] = argument.text
                                    else:
                                        self.meetingDictionary["time"] = self.meetingDictionary["time"] + " " + argument.text
                                elif ent.label_ == 'PLACE':
                                    if self.meetingDictionary["location"] is None:
                                        self.meetingDictionary["location"] = argument.text

        if meetingDetected == True:
            self.notifier.notify(jobid, "log", "Meeting context detected")
            for attendee in attendeeList:
                self.addAttendees(attendee)
            self.meetingDictionary["attendees"] = ",".join(list(self.meetingDictionary['attendees']))
            self.meetingDictionary["jobid"] = jobid
            self.meetingDictionary["subject"] = "Scheduled meeting based on call from %s to %s" %(caller, callee)            

            if self.meetingDictionary["date"] == None:
                self.meetingDictionary["date"] = 'wednesday'
            if self.meetingDictionary["time"] == None:
                self.meetingDictionary["time"] = "3:00 p.m."

            self.meetingDictionary["starttime"] = self.find_date(self.meetingDictionary["date"]).strftime("%Y-%m-%dT")+self.timeconvert(self.meetingDictionary['time'])
            starttime = self.meetingDictionary['starttime']
            hour = int(starttime[11:13]) + 1
            endtime = starttime[:11] + str(hour) + starttime[-6:]
            self.meetingDictionary['endtime'] = endtime
            self.notifier.notify(jobid, "log", "Extracted meeting related params %s" % json.dumps(self.meetingDictionary))
            self.actionList.append(self.meetingDictionary)

        for ticket in ticketList:
            self.addTicket(ticket)

        if len(self.ticketDictionary["id"]) != 0:
            self.ticketDictionary["jobid"] = jobid
            self.ticketDictionary["id"] = ",".join(list(self.ticketDictionary["id"]))
            self.actionList.append(self.ticketDictionary)
        return self.actionList


    def on_get(self, req, resp):
        text_param = req.get_param("text")
        caller = req.get_param("caller")
        callee = req.get_param("callee")
        print("caller %s, callee %s"%(caller, callee))
        jobid = req.get_param("jobid")
        u = unicode_(text_param, "utf-8")
        result = self.lableText(u,jobid, caller, callee) 
        resp.body = json.dumps(result)
        resp.content_type = 'application/json'
        resp.append_header('Access-Control-Allow-Origin', "*")
        resp.status = falcon.HTTP_200
        return resp

if __name__ == '__main__':
    RESSOURCE = AllResource()
    text=u"Suresh said \"Hi Tirumala\""
    u"Tirumala said \"Hi Suresh\""
    u"Suresh said \"This is regarding ports validation in our internal lab\""
    u"Tirumala said \"Okay\""
    u"Suresh said \"We are all facing some issues, may be you need to configure them\""
    u"Tirumala said \"Okay\""
    u"Suresh said \"Can we include Hari also, he is also facing the same issue\""
    u"Tirumala said \"Let us call him to the meeting\""
    u"Suresh said \"I will set up a meeting at 3PM\""
    u"Tirumala said \"where\""
    u"Suresh said \"on WebEx\""
    #RESSOURCE.lableText(text)  
    APP = falcon.API()
    APP.add_route('/action', RESSOURCE)
    HTTPD = make_server('0.0.0.0', 9000, APP)
    HTTPD.serve_forever()

