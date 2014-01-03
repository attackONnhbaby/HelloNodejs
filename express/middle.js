var http = require('http');
var express = require('express');
var con = require('./debug.js');

var app = express();

app.use(function(request, response, next){
	con.con('1111111asd');
	next();
});

http.createServer(app).listen(52237, function(){console.log('1');});