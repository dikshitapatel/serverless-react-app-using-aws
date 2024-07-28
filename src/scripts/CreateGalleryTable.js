var AWS = require("aws-sdk");

//setting up the target region 
AWS.config.update({
  region: "us-east-2"
});

//Create an instance of Dynamo DB
var dynamodb = new AWS.DynamoDB();

//The gallery table closely matches with the json of gallery.json
var params = {
  TableName: "Gallery",
  KeySchema: [
    // Partition Key
    { AttributeName: "src", KeyType: "HASH" },
    // Sort Keys
    { AttributeName: "className", KeyType: "RANGE"}  
  ],
  AttributeDefinitions: [
    { AttributeName: "src", AttributeType: "S" },
    { AttributeName: "alt", AttributeType: "S" },
    { AttributeName: "className", AttributeType: "S" }
  ],
  LocalSecondaryIndexes: [
    {
      IndexName: "AltIndex",
      KeySchema: [
        { AttributeName: "src", KeyType: "HASH" },
        { AttributeName: "alt", KeyType: "RANGE" }
      ],
      Projection: {
        ProjectionType: "KEYS_ONLY"
      }
    }
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