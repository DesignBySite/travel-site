var fs = require('fs');
var https = require('https');

fs.writeFile(__dirname + "/index.html","<h1>HTML is great</h1>", function(error) {
  if (error) {
    return console.error();
  } else {
    return console.log("congrats");
  }
});

var myPhotoLocation = "https://images.unsplash.com/photo-1518065336951-d16c043900d6?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=05f800ba4e6c18a40a8f7cf12cdd2c35&auto=format&fit=crop&w=668&q=80";

https.get(myPhotoLocation, function(response){
  response.pipe(fs.createWriteStream(__dirname + "/bballCourt.jpeg"));
});
