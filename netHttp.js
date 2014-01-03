var net = require('net');

net.createServer(function(socket) {
	socket.on('data', function(data) {
//		console.log('server <- ' + data.toString());
		
		socket.write('HTTP/1.1 200 OK\n');
		socket.write('Server: nodejs\n');
		socket.write('Content-Type: text/html\n');
		socket.write('Content-Length: 21\n');
		socket.write('\n');
		socket.write('<h1>HELLO WORLD!!</h1>');
		socket.end();
	});
}).listen(52273, function() {
	console.log('run');
});