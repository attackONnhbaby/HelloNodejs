var http = require('http');
var url = require('url');

http.createServer(function(request, response){
  var query = url.parse(request.url, true).query;
  
  console.log('=====================');
  console.log(query);
  
  response.writeHead(200, {'Content-Type':'text/html'});
  response.end(JSON.stringify(query));
  
}).listen(52273, function(){
  console.log('running!!');
});