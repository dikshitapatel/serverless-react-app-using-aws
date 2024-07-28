var AWS = require("aws-sdk");
var fs = require('fs');

AWS.config.update({
  region: "us-east-2"
});

console.log("Writing entries to Accessibilities table.");

var dynamodb = new AWS.DynamoDB.DocumentClient();
//Parsing the json file
var accessibilitiesData = 
  JSON.parse(fs.readFileSync('../components/data/accessibilities.json', 'utf8'));

accessibilitiesData.forEach(function(accessibililty) {
  var params = {
    TableName: "Accesibilities",
    Item: {
      "name": accessibililty.name
    }
  };

  dynamodb.put(params, function(err, data) {
    if (err)
      console.error("Unable to load data into table for accessibility",
                    accessibililty.name, ". Error: ", JSON.stringify(err, null, 2))
    else
      console.log("Added", accessibililty.name, "to table.")
  })
});