var http = require('http');
var fs = require('fs');
var jade = require('jade');

http.createServer(function(request, response){
  fs.readFile('jadePage.jade', 'utf8', function(error, data){
    var fn = jade.compile(data);
    
    response.writeHead(200, {'Content-Type':'text/html'});
    response.end(fn());
  });
}).listen(52273);