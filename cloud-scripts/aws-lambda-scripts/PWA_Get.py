import boto3
import json

dynamodb = boto3.resource('dynamodb')
table_name = 'PWA_EXP'
table = dynamodb.Table(table_name)

def lambda_handler(event, context):
    response = table.scan()
    items = response['Items']
    while 'LastEvaluatedKey' in response:
        response = table.scan(ExclusiveStartKey=response['LastEvaluatedKey'])
        items.extend(response['Items'])

    response = {
        'statusCode': 200,
        'body': json.dumps(items,default=str)
    }
    return response