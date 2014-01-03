var fs = require('fs');
var ejs = require('ejs');
var http = require('http');
var express = require('express');

var counter = 0;
function Product(name, image, price, count) {
	this.index = counter++;
	this.name = name;
	this.image = image;
	this.price = price;
	this.count = count;
}

var products = [
        new Product('javascript', 'gift.png', '28000', 10),
        new Product('jquery', 'gift.png', '18000', 43),
        new Product('nodejs', 'gift.png', '38000', 4),
        new Product('socketio', 'gift.png', '48000', 5),
        new Product('suji', 'gift.png', '24000', 6),
        new Product('php', 'gift.png', '24500', 43),
        new Product('bread', 'gift.png', '16600', 2),
        new Product('have', 'gift.png', '51200', 65),
        new Product('to', 'gift.png', '2300', 76),
        new Product('tasks', 'gift.png', '5200', 23),
        new Product('online', 'gift.png', '3100', 34)
	];

var app = express();
var server = http.createServer(app);

app.use(app.router);
app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response){
	var html = fs.readFileSync('shop.html', 'utf8');
	
	response.send(ejs.render(html, {
		products: products
	}));
});

server.listen(52273, function(){
	console.log('server run!!!!');
});

var io = require('socket.io').listen(server);
io.sockets.on('connection', function(socket){
	
	console.log(products);
	
	function onReturn(index) {
		products[index].count++;
		
		clearTimeout(cart[index].timerID);
		
		delete cart[index];
		
		io.sockets.emit('count', {
			index: index,
			count: products[index].count,
			flag: 'b'
		});
	}
	
	var cart = {};
	
	socket.on('cart', function(index){
		products[index].count--;
		
		cart[index] = {};
		cart[index].index = index;
		cart[index].timerID = setTimeout(function(){
			onReturn(index);
		}, 1000);
		
		console.log('-------> cart');
		console.log('index : ' + index);
		console.log(cart);
		
		io.sockets.emit('count', {
			index: index,
			count: products[index].count
		});
	});
	
	socket.on('buy', function(index){
		clearTimeout(cart[index].timerID);
		
		delete cart[index];
		
		io.sockets.emit('count', {
			index: index,
			count: products[index].count
		});
	});
	
	socket.on('return', function(index){
		onReturn(index);
	});

	socket.on('test', function(){
		io.sockets.emit('test', {
			cart: cart
		});
	});
});