var express = require('express');
var app = express();
var server = require('http').createServer(app);
server.listen(3000);
var io = require('socket.io')(server);



io.on('connection', function(client){
    console.log('connection');
    client.on('create', function (room) {
        console.log('Join the room');
        client.in(room.name).emit('event', room);
        client.join(room.name);
    });
    client.on('disconnect', function(){
        console.log("Disconnected....");
    });
});

// app.get('/test', function(req, res, next) {
//     res.send('respond with a resource.');
//   });

app.get('/', function(req, res, next) {
    res.send('respond with a resource.');
  });



