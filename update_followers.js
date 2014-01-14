var twit = require('./lib/twit'),
    AWS = require('aws-sdk'),
    s3,
    params = {
      Bucket: 'lebty-followers',
      Key: 'tmp/followers.js',
      ACL: 'public-read'
    };

AWS.config.loadFromPath('./s3_config.json');
s3 = new AWS.S3();

twit.getFollowers(null, function(followers) {
  params.Body = 'window.followers = ' + JSON.stringify(followers) + ';';

  s3.putObject(params, function(error) {
    if(error) {
      console.log("Error: ", error);
    } else {
      console.log("Successfully uploaded data to tmp/followers.js");
    }
  });
});
