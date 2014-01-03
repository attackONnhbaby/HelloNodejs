var net = require('net');
var crypto = require('crypto');

var guid = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11';

net.createServer(function(socket) {
	socket.on('data', function(data) {
		if(/websocket/.test(data.toString())) {
			var headers = data.toString().split('\n');
			var socketKey = '';
			headers.forEach(function(item) {
				var dirtionary = item.split(':');
				if(dirtionary.length == 2 && dirtionary[0].toLowerCase().trim() == 'sec-websocket-key') {
					socketKey = dirtionary[1].trim();
					console.log('socketKey : ' + socketKey);
				}
			});
			
			var longKey = socketKey + guid;
			var shasum = crypto.createHash('sha1').update(longKey);
			var outputKey = shasum.digest('base64');
			
			socket.write('HTTP/1.1 101 Switching Protocols\r\n');
			socket.write('Upgrade: WebSocket\r\n');
			socket.write('Connection: Upgrade\r\n');
			socket.write('Sec-WebSocket-Accept: ' + outputKey + '\r\n\r\n');
			setInterval(function() {
				var output = 'hey~';
				var frameBuffer = new Buffer(2 + output.length);
				frameBuffer[0] = 0x81;
				frameBuffer[1] = output.length;
				for(var i = 0; i < output.length; i++) {
					frameBuffer[i+2] = output.charCodeAt(i);
				}
				socket.write(frameBuffer);
			}, 1000);
		} else if(/HTTP/.test(data.toString())) {
			var output = [];
			output.push('<script>');
			output.push('	var socket = new WebSocket("ws://127.0.0.1:52273/")');
			output.push('	socket.onopen = function(event) {');
			output.push('	console.log("web socket open");');
			output.push('		setInterval(function() {');
			output.push('			socket.send("from client");');
			output.push('		}, 1000);');
			output.push('	};');
			output.push('	socket.onerror = function(error) {');
			output.push('		console.log(error);');
			output.push('	};');
			output.push('	socket.onmessage = function(event) {');
			output.push('		console.log("web socket data : " + event.data);');
			output.push('	};');
			output.push('	socket.onclose = function(event) {');
			output.push('		console.log("web socket close");');
			output.push('	};');
			output.push('</script>');
			
			output = output.join('\n');
			
			socket.write('HTTP/1.1 200 OK\r\n');
			socket.write('Server: nodejs');
			socket.write('Content-Type: text/html\r\n');
			socket.write('Content-Length: ' + output.length + '\r\n');
			socket.write('\r\n');
			socket.write(output);
			socket.end();
		} else {
			var opcode = data[0] & 0x0F;
			var payloadLength = data[1];
			var mask = [data[2], data[3], data[4], data[5]];
			
			var output = new Buffer(payloadLength);
			for(var i = 6; i < payloadLength + 6; i++) {
//				output += String.fromCharCode(data[i] ^ mask[(i - 6) % 4]);
				output[i - 6] = data[i] ^ mask[(i - 6) % 4];
			}
			
//			console.log('===============================================');
			console.log(output);
		}
	});
}).listen(52273, function() {
	console.log('run');
});