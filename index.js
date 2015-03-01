var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

console.log("Socket is ready...");

app.get('/', function(request, response){
  response.sendfile('sample.html');
});

io.on('connection', function(socket){
  //console.log('a user connected');
  //socket.on('disconnect', function(){
  	//console.log('user disconnected');
  //});
  socket.on('chat message', function(msg){
  	io.emit('chat message', msg);
  });
});

http.listen(8080, function(){
  console.log('listening on *:8080');
});