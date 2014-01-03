var http = require('http');

http.createServer(function(request, response){
  
  if(request.url === '/') {
    response.write('okok');
    response.end();
  } else {
    error.error.error();
  }
  
  response.writeHead(200, {'Content-Type':'text/html'});
  response.end('<h1>test!!</h1>');
}).listen(52273, function(){
  console.log('run!!');
});