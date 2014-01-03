/**
* @nhbaby
* repo github1
*/
var http = require('http');
var ejs = require('ejs');
var fs = require('fs');
var express = require('express');
var socket = require('socket.io');

var app = express();
app.use(app.router);
app.use(express.static(__dirname + '/public'));
var data = [0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12];
var match = {};
var user = [];
var room = [];

function randMatch() {
	data = [0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12];
	for(var i = 0; i < 5; i++) {
		for(var j = 0; j < 5; j++) {
			//var c = Math.floor((Math.random()*data.length)+1);
			if(typeof match[i] == 'undefined') {
				match[i] = [];
			}
			match[i][j] = popData();
			//match[i][j] = data.splice(c, 1);
		}
	}
	//console.log(data);
	console.log("===================================");
	console.log(typeof match);
	console.log(match);
}

function popData() {
	var c = Math.floor((Math.random()*data.length));
	var ret;
	ret = data[c];
	//console.log('data.length : ' + data.length + ', c : ' + c + ', data : ' + data[c] + ', ret : ' + ret);
	data.splice(c, 1);
	return ret;
}

/*
app.get('/', function(request, response){
	var html = fs.readFileSync('numberMatchPage.html', 'utf8');
	
	response.send(ejs.render(html, {
		match: match
	}));
});
*/
app.get('/game/:name', function(request, response) {
	randMatch();

	fs.readFile('numberMatchPage.html', function(error, data) {
		response.send(ejs.render(data.toString(), {
			match: match,
			name: request.param('name')
		}));
	});
/*
	var html = fs.readFileSync('numberMatchPage.html', 'utf8');
	response.send(ejs.render(html, {
		match: match
	}));
*/
});

app.get('/chkName', function(request, response) {
	var a = {result:1};
	for(var i in user) {
		if(user[i] == request.param('name')) {
			a['result'] = 0;
			break;
		}
	}

	if(a['result'] == 1) {
		user.push(request.param('name'));
	}
	response.end(JSON.stringify(a));
});

app.get('/', function(request, response) {
	fs.readFile('numberMatchLobby.html', function(error, data) {
		response.send(ejs.render(data.toString()));
	});	
});

app.get('/getroom', function(request, response) {
	console.log('------------------------------------');
	console.log(room);
	response.send(JSON.stringify(room));
});

app.get('/wait/:name', function (request, response) {
	fs.readFile('numberMatchWait.html', function (error, data) {
		response.send(ejs.render(data.toString()));
	});
});

var server = http.createServer(app).listen(52273, function(){
  console.log('number match server run!!');
});

var io = socket.listen(server);
io.sockets.on('connection', function(socket) {

	socket.on('join', function(data) {
		socket.join(data);
		socket.get('room', data);
	});

	socket.on('create_room', function(data) {
		console.log('create room : ' + data.toString());
		room.push(data.toString());
		io.sockets.emit('create_room', data.toString());
	});

	socket.on('bb', function(data) {
		socket.emit('bb', {
			x: data.x,
			y: data.y
		});
	});
});