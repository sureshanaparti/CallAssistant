import requests
import json

class logger():

    def __init__(self, service):
        self.logger_ip="10.233.88.74"
        if self.logger_ip is None:
            return
        port = "3000"
        self.logger_url = "http://%s:%s/notifyEvent"%(self.logger_ip,port)
        self.service = service


    def log(self, jobId, tp, message,service=None):
        if self.logger_ip is None:
           return
        self.data = {}
        self.data['jobid'] = jobId
        self.data['type'] = tp
        if service is None:
           service = self.service 
        self.data['service'] = service
        self.data['message'] = message
        print("logging message %s" % (json.dumps(self.data)))
        custom = {'content-type': 'application/json'}
        r = requests.post(self.logger_url,json.dumps(self.data), headers=custom)
        if (r.status_code != 200):
           print("logging failed: %s"%r.text)
