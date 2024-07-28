var AWS = require("aws-sdk");

//setting up the target region 
AWS.config.update({
  region: "us-east-2"
});

//Create an instance of Dynamo DB
var dynamodb = new AWS.DynamoDB();

var params = {
  TableName: "Accesibilities",
  KeySchema: [
    // Partition Key
    { AttributeName: "name", KeyType: "HASH" },
  ],
  AttributeDefinitions: [
    { AttributeName: "name", AttributeType: "S" }
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 10,
    WriteCapacityUnits: 10
  }
};

dynamodb.createTable(params, function(err, data) {
  if (err)
    console.error("Unable to create table: ", JSON.stringify(err, null, 2))
  else
    console.log("Created table with description: ", JSON.stringify(data, null, 2))
});