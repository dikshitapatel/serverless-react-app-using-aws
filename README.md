# Hotel Application Setup

This README provides instructions to set up and deploy the hotel application using AWS services, including DynamoDB, IAM roles, Lambda functions, and API Gateway.

## Prerequisites

- Node.js and npm installed
- AWS CLI configured with appropriate permissions

## Step 1: Install AWS SDK

First, install the AWS SDK:

```bash
npm install aws-sdk
```

## Step 2: Create DynamoDB Tables

Navigate to the `src/scripts` directory and create the `MenuLinks` table in DynamoDB:

```bash
cd src/scripts
node CreateMenuLinksTable.js
```

Similarly, create tables for `accessibility`, `gallery`, and `service` by creating corresponding scripts similar to `CreateMenuLinksTable.js` and running them.

## Step 3: Load Data into DynamoDB

Load the data from JSON files into DynamoDB using the load scripts in the `scripts` folder. Ensure you have load scripts prepared for each table.

## Step 4: Create IAM Role for Lambda and DynamoDB Access

1. Go to AWS Management Console.
2. Navigate to **IAM** > **Roles** > **Create role**.
3. Select **Lambda** function to call AWS services on your behalf.
4. Assign the following policies:
    - `AWSLambdaBasicExecutionRole`
    - `AmazonDynamoDBFullAccess`
5. Complete the role creation.

## Step 5: Write Lambda Functions

Write Lambda functions to access the DynamoDB tables and return JSON responses. Example Lambda function to get services data:

```javascript
const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    const params = {
        TableName: 'services',
    };

    try {
        const data = await dynamoDB.scan(params).promise();
        return {
            statusCode: 200,
            body: JSON.stringify(data.Items),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to fetch services data' }),
        };
    }
};
```

## Step 6: Create API Endpoints

1. Go to **API Gateway** in the AWS Management Console.
2. Create a new **HTTP API**.
3. Go to **Routes** and create a route. Example:
    - Route: `GET /services`
    - Attach it to the `getServices` Lambda function.
4. Deploy the API and create a stage for production.

Repeat the process to create `GET` endpoints for `Gallery`, `MenuLinks`, and `Accessibility`.

## Summary of Routes

| Endpoint          | Lambda Function       |
|-------------------|-----------------------|
| `GET /services`   | `getServices`         |
| `GET /gallery`    | `getGallery`          |
| `GET /menuLinks`  | `getMenuLinks`        |
| `GET /accessibility` | `getAccessibility`  |

## Final Steps

After setting up all the components, ensure that:
- Your React app is configured to call these endpoints.
- The environment variables are correctly set up in your app to point to the deployed API Gateway endpoints.