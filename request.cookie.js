var http = require('http');

http.createServer(function(request, response){
  var cookie = request.headers.cookie;
  
  //console.log(cookie);
  
  cookie = cookie.split(';').map(function(element){
    var element = element.split('=');
    return { key : element[0], value : element[1] };
  });
  
  if(typeof cookie === 'undefined') {
    response.writeHead(200, {
      'Content-Type':'text/html',
      'Set-Cookie':['name=zzz', 'old=191199']
    });
  }
  
  response.end(JSON.stringify(cookie));
  
}).listen(52273, function(){
  console.log('run!!!');
});