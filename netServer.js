var net = require('net');

net.createServer(function(socket) {
	socket.on('data', function(data) {
		console.log('server <- ' + data.toString('utf8'));
		
		socket.write(data);
	});
}).listen(52273, function() {
	console.log('TCP server running at 127.0.0.1:52273');
});