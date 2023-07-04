# Cloud Scripts

This directory covers all the code written to handle the backend functionality.

The `aws-lambda scripts` folder contains the code for the different lambda functions that handle the different routes that interact with the AWS DynamoDB table. 

The `google-app-scripts` folder contains the code for the google-app-script that is associated with the `Experiment-Database` [google sheet](https://docs.google.com/spreadsheets/d/1x12nhpp0QvnsA6x-O1sV4IA9SAbfVsq_wiexWkutOmU/edit#gid=1722069818). This script, when run, will push all the eligible experiments to the dynamodb table, via a post request.



