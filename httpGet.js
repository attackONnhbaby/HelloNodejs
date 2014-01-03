var http = require('http');
var fs = require('fs');

http.get({
	host: 'www.kma.go.kr',
	path: '/weather/forecast/mid-term-rss.jsp?stnId=108'
}, function(response) {
	response.setEncoding('utf8');
	
	var result = '';
	
	response.on('end', function() {
		fs.writeFile('XMLFile.xml', result);
	}).on('data', function(data) {
		result += data;
	});
	
	response.on('data', function(data) {
		console.log('download');
//		console.log(data);
	});
});