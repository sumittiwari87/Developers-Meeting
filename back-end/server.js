var express = require('../node_modules/express');
var app = express();
var bodyParser = require('../node_modules/body-parser');
var fs = require('fs');

function readJSONFile(filename, callback) {
  fs.readFile(filename, function (err, data) {
    if(err) {
      callback(err);
      return;
    }
    try {
      callback(null, JSON.parse(data));
    } catch(exception) {
      callback(exception);
    }
  });
}

app.get('/api', function(req,res){
    var data;
    readJSONFile("../package.json",function (err, json) {
      if(err) { 
        throw err; 
      }
      res.send(json); 
      
    });
    
});

app.use(bodyParser.json());

app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

app.all('/api', function (req, res, next) {
  console.log('Accessing the secret section ...');
  next(); // pass control to the next handler
});

app.post('/post', function(req,res){
    console.log(req.body.name);
    res.send(req.body);
    res.status(200);
});

var server = app.listen(5000, function(){
    console.log('listening on port ', server.address().port);
    console.log("Your current directory is : - "+__dirname);
});
