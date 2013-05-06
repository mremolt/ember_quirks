var express = require('express'),
  http = require('http');

var app = express();

app.configure(function () {
  app.use(express.directory(__dirname));
  app.use(express.static(__dirname));
});

http.createServer(app).listen(3000, function(){
});
