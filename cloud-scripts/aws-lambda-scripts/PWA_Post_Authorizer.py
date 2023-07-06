import json
import os

def lambda_handler(event, context):
    
    #1 - Log the event
    print('*********** The event is: ***************')
    print(event)
    
    #2 - See if the person's token is valid
    auth = event['headers']["authorization"]
    if auth===os.environ['auth_token']:
        auth = 'Allow'
    else:
        auth = 'Deny'
    
    #3 - Construct and return the response
    authResponse = { "principalId": os.environ['auth_token'], "policyDocument": { "Version": "2012-10-17", "Statement": [{"Action": "execute-api:Invoke", "Resource": ["arn:aws:execute-api:ap-southeast-2:816397707103:8kne7udek3/*/*"], "Effect": auth}] }}
    return authResponse