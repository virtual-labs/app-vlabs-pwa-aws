import boto3

dynamodb = boto3.resource('dynamodb')
table_name = 'PWA_EXP'
table = dynamodb.Table(table_name)

def lambda_handler(event, context):
    exp_id = event['pathParameters']['id']
    response = table.delete_item(
        Key={
            'Experiment Short Name': exp_id
        }
    )

    if 'ResponseMetadata' in response and response['ResponseMetadata']['HTTPStatusCode']===200:
        return {
            'statusCode': 200,
            'body': 'Item deleted successfully'
        }
    else:
        return {
            'statusCode': 403,
            'body': 'Failed to delete item'
        }

