var app = require('express')();
var server= require('http').createServer(app);
var io = require('socket.io').listen(server);

users =[];
connections =[];

server.listen(process.env.PORT || 3000);
console.log('Server running...');

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index1.html');
});

io.sockets.on('connection',function(socket){
  connections.push(socket);
  console.log("Connected: %s sockets connected",connections.length);
  
  //Disconect 
  socket.on("disconnect",function(data){
    connections.splice(connections.indexOf(socket),1);
    console.log('Disconnect: %s socket connected',connections.length);
  }) 

  //Send msg
  socket.on("send message",function(data){
    console.log(data);
    io.sockets.emit("new message",{msg:data});
  });

})

/* io.on('connection', function(socket){
    socket.on('chat message', function(msg){ 
      console.log(msg);
      io.emit('chat message', msg);
    });
});

io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('disconnect', function(){
      console.log('user disconnected');
    });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
}); */