var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

console.log("Socket is ready...");
app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
  response.sendfile('chat.html');
});

io.on('connection', function(client){
  console.log('a user connected');
  client.on('join', function(name) {
  	client.nickname = name;
  	console.log("Welcome: " + name);
  });
  client.on('message', function(data) {
  	var nickname = client.nickname;
  	client.broadcast.emit('message', nickname + ': ' + data)
  	client.emit('message', nickname + ': ' + data);
  });
});

http.listen(8080, function() {
  console.log('listening on *:8080');
});
