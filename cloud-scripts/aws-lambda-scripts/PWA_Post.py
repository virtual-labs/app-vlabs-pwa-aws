import boto3
import json

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('PWA_EXP')

def lambda_handler(event, context):
    print(event)
    items = json.loads(event['body'])["items"]
    
    with table.batch_writer() as batch:
        for item in items:
            batch.put_item(Item=item)
    
    return {
        'statusCode': 200,
        'body': 'Items added to DynamoDB table'
    }