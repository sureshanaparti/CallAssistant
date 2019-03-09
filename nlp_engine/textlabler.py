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
        self.notifier = notifier("Analyser")
        self.teamMembers = {"Hari","Bharat","Suresh","Sadhu","Pavan","Srinivas","Lokesh","Alok","Srikanth","Santosh","Tirumala"}
    
    def addAttendees(self, attendees):
        attendeeList = self.meetingDictionary['attendees']
        attendeeList.add(attendees)
        self.meetingDictionary['attendees'] = attendeeList

    def addTicket(self, ticket):
        ticketList = self.ticketDictionary['id']
        ticketList.add('CS-' + ticket)
        self.ticketDictionary['id'] = ticketList

    def lableText(self, text, jobid):
        self.actionList = []
        doc = self.textLabler(text)
        print("token.text, token.dep_, token.head.text, token.head.pos_, [child for child in token.children]")
        print("%s" % doc)
        idx = 0
        self.meetingDictionary = {'action':'meeting', 'time':None, 'date':None, 'attendees':set(), 'host':None, 'webex':None, 'location':None}
        self.ticketDictionary = {'action':'jiraBug', 'id':set()}

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
                                nameidentity = self.textLabler(timeOrPlace.text + " " + timeOrPlace.text)
                                if nameidentity is None or nameidentity.ents is None or len(nameidentity.ents) == 0:
                                    self.meetingDictionary['location'] = timeOrPlace.text
                                else:
                                    for ent in nameidentity.ents:
                                        if ent.label_ == 'TIME':
                                            self.meetingDictionary['time'] = timeOrPlace.text
                                        else:
                                            self.meetingDictionary['location'] = timeOrPlace.text
                        elif argument.text == 'on':
                            for timeOrPlace in argument.children:
                                nameidentity = self.textLabler(timeOrPlace.text + " " + timeOrPlace.text)
                                for ent in nameidentity.ents:
                                    if ent.label_ == 'DATE':
                                        self.meetingDictionary['date'] = timeOrPlace.text
                                        break
                        elif argument.text == 'I' or argument.text == 'me' or argument.text == 'us':
                            whosaidthis = required_verb.head
                            print ("whosaidthis %s" %whosaidthis.text)
                            while whosaidthis.dep_ != 'ROOT':
                                whosaidthis = whosaidthis.head
                            for host in whosaidthis.children:
                                print ("whosaidthis children %s" %host.text)
                                if host.text in self.teamMembers:
                                    self.meetingDictionary['host'] = host.text
                                    self.addAttendees(host.text)
                                    break
                        elif argument.text in self.teamMembers:
                            self.meetingDictionary['host'] = argument.text
                            self.addAttendees(argument.text)
                        else:
                            nameidentity = self.textLabler(argument.text + " " + argument.text)
                            for ent in nameidentity.ents:
                                if ent.label_ == 'DATE':
                                    if self.meetingDictionary['date'] is None:
                                        self.meetingDictionary['date'] = argument.text
                                elif ent.label_ == 'TIME':
                                    if self.meetingDictionary['time'] is None:
                                        self.meetingDictionary['time'] = argument.text
                                    else:
                                        self.meetingDictionary['time'] = self.meetingDictionary['time'] + " " + argument.text
                                elif ent.label_ == 'PLACE':
                                    if self.meetingDictionary['location'] is None:
                                        self.meetingDictionary['location'] = argument.text

        if meetingDetected == True:
            self.notifier.notify(jobid, "log", "Meeting context detected")
            for attendee in attendeeList:
                self.addAttendees(attendee)
            self.meetingDictionary['attendees'] = ",".join(list(self.meetingDictionary['attendees']))
            self.meetingDictionary['jobid'] = jobid
            self.notifier.notify(jobid, "log", "Extracted meeting related params %s" % json.dumps(self.meetingDictionary))
            self.actionList.append(self.meetingDictionary)

        for ticket in ticketList:
            self.addTicket(ticket)

        if len(self.ticketDictionary['id']) != 0:
            self.ticketDictionary['jobid'] = jobid
            self.actionList.append(self.ticketDictionary)
        return self.actionList


    def on_get(self, req, resp):
        text_param = req.get_param("text")
        jobid = req.get_param("jobid")
        u = unicode_(text_param, "utf-8")
        result = self.lableText(u,jobid) 
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

