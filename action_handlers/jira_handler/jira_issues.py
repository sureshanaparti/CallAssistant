#!/usr/bin/env python
# -*- coding: utf-8 -*-

from jira.client import JIRA
import sys
import pprint

def connect_jira(jira_server, jira_user, jira_password):
    '''
    Connect to JIRA. Return None on error
    '''
    try:
        jira_options = {'server': jira_server}
        jira = JIRA(options=jira_options,
                    # Note the tuple
                    basic_auth=(jira_user,
                                jira_password))
        return jira
    except Exception,e:
        print "Failed to connect to JIRA: %s" % e
        return None

def print_issue(issue):
    '''
    Print out formatted jira issue
    '''
    print "Issue:       %s" % issue.key
    print "Description: %s" % issue.fields.description
    print "Assignee:    %s" % issue.fields.assignee.displayName	
    print "Status:      %s" % issue.fields.status.name
   
    print "Link:        %s/browse/%s" % (server, issue.key)


def search_comment(issue):
	print  "i am in search_comment"
	
server = 'https://issues.accelerite.com'
jira = connect_jira(server, 'sadhu', 'sadhu')

if len(sys.argv) < 2:
    sys.exit("You must give an issue id.")

issueId = sys.argv[1].lower()
try:
    if issueId.startswith("cs-"):
	    	issue = jira.issue(issueId)
	    	print_issue(issue)
    else:
	    projectlist = jira.search_issues('project = CloudPlatform')
	    print "i am in else",projectlist
	    for ticket in projectlist:
			issue=jira.issue(ticket)
			print issue.key
		    
    #search_comment(issue)
    #print dir(issue)
    #print dir(issue.fields)
    #pprint.pprint(issue.fields)
except Exception,e:
	print "Can't find the required attributes related to this issue."



'''if __name__ == "__main__": 
    print "File2 is being run directly"
else: 
    print "File2 is being imported"
'''