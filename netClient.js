var net = require('net');

var socket = net.connect(52273, '127.0.0.1', function() {
	console.log('Client Start');
});

socket.on('data', function(data) {
	console.log('server -> : ' + data.toString());
});

process.stdin.resume();
process.stdin.on('data', function(chunk) {
	socket.write(chunk);
});