var AWS = require("aws-sdk");
var fs = require('fs');

AWS.config.update({
  region: "us-east-2"
});

console.log("Writing entries to GalleryImages table.");

var dynamodb = new AWS.DynamoDB.DocumentClient();
var galleryImagesData = 
  JSON.parse(fs.readFileSync('../components/data/gallery.json', 'utf8'));

galleryImagesData.forEach(function(galleryImage) {
  var className = galleryImage.className;
  if (className.trim() == "")
    className = "no_class";

  var params = {
    TableName: "Gallery",
    Item: {
      "src": galleryImage.src,
      "alt": galleryImage.alt,
      "className": className
    }
  };

  dynamodb.put(params, function(err, data) {
    if (err)
      console.error("Unable to load data into table for gallery images",
                    galleryImage.src, ". Error: ", JSON.stringify(err, null, 2))
    else
      console.log("Added", galleryImage.src, "to table.")
  });
});