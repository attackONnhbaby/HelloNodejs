var http = require('http');
var express = require('express');

var app = express();


app.use(function(request, response){
  //#1
  //response.writeHead(200, {'Content-Type':'text/html'});
  //response.end('asdfasdf');
  
  //#2
  /*
  var output = [];
  for(var i = 0; i < 10; i++) {
    output.push({count:i, name: 'name - ' + i});
  }
  
  response.send(output);
  */
  
  //#3
  //response.send(404, 'error page');
  
  //#4
  /*
  var agent = request.header('User-Agent');
  
  console.log(request.headers);
  console.log('=======================');
  console.log(agent);
  
  response.send(200);
  */
  
  //#5
  /*
  var agent = request.header('User-Agent');
  //console.log(agent.toLowerCase());
  if(agent.toLowerCase().match(/chrome/)) {
    response.send('good!!');
  } else {
    response.send('bad!!!!!');
  }
  */
  
  //#6
  var name = request.param('name');
  var region = request.param('region');
  
  response.send(name + ' : ' +region);
});

http.createServer(app).listen(52273, run)

var run = function(){
  console.log('run!!');
};