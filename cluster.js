var cluster = require('cluster');
var os = require('os');
var http = require('http');
var fs = require('fs');

var cpuCount = os.cpus().length;
console.log('cup count : ' + cpuCount);

if(cluster.isMaster) {
	for(var i = 0; i < cpuCount; i++) {
		console.log('cluster.fork()');
		cluster.fork();
	}
	
	cluster.on('death', function(worker) {
		console.log('worker : ' + worker.pid + ' died');
	});
} else {
	http.createServer(function(request, response) {
		try {
			var data = fs.readFileSync('POST_HTMLPage.html', 'utf8');
			response.writeHead(200, {'Content-Type':'text/html'});
			response.end(data);
		} catch(exception) {
			console.log(exception);
		}
	}).listen(52273, function() {
		console.log('run server!!!!!!!!!!!!!!!');
	});
	
//	console.log('console.log()');
}