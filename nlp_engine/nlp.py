#!/home/semicolon/coref/bin/python
# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from __future__ import print_function

import json
from wsgiref.simple_server import make_server
import falcon
import spacy
import requests
import os
from logger import logger

#os.sys.path.append('/home/semicolon/coref/bin')

try:
    unicode_ = unicode  # Python 2
except NameError:
    unicode_ = str      # Python 3


class AllResource(object):
    def __init__(self):

        self.nlp = spacy.load('en_coref_lg')
        print("nlp resource loaded.")
        self.response = None
        self.logger = logger("nlp") 
        self.meetingDictionary = {'time':None, 'date':None, 'attendees':[], 'host':None, 'webex':None, 'room':None}
        self.teamMembers = {"Hari","Bharat","Suresh","Sadhu","Pavan","Srinivas","Lokesh","Alok","Srikanth","Santosh","Tirumala"}


    def on_get(self, req, resp):
        self.response = {}

        text_param = req.get_param("text")
        jobid = req.get_param("jobid")
        if text_param is None:
            resp.body = json.dumps("No input text received")
            resp.content_type = 'application/json'
            resp.append_header('Access-Control-Allow-Origin', "*")
            resp.status = falcon.HTTP_200
            return resp

        message = "Received input text:\n %s" %(text_param)
        print("%s" %message)
        self.logger.log(jobid,"log",message)

        if text_param is not None:
            text = ",".join(text_param) if isinstance(text_param, list) else text_param
            text = unicode_(text)
            doc = self.nlp(text)
            if doc._.has_coref:
                mentions = [{'start':    mention.start_char,
                             'end':      mention.end_char,
                             'text':     mention.text,
                             'resolved': cluster.main.text
                            }
                            for cluster in doc._.coref_clusters
                            for mention in cluster.mentions]
                clusters = list(list(span.text for span in cluster)
                                for cluster in doc._.coref_clusters)
                resolved = doc._.coref_resolved
                self.response['mentions'] = mentions
                self.response['clusters'] = clusters
                self.response['resolved'] = resolved
            else:
                self.response['resolved'] = text_param

        print("response = %s" % self.response['resolved'])
        #resp.body = json.dumps(self.response)
        #resp.content_type = 'application/json'
        #resp.append_header('Access-Control-Allow-Origin', "*")
        #resp.status = falcon.HTTP_200
        self.logger.log(jobid, "log", "analyzing transcript")
        r = requests.get("http://localhost:9000/action?text=%s"%self.response['resolved'])      
        print("json response%s" %r.text)
        resp.body = r.text
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
    APP.add_route('/nlp', RESSOURCE)
    HTTPD = make_server('0.0.0.0', 8000, APP)
    HTTPD.serve_forever()
