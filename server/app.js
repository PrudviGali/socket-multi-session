var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

io.on('connection', function(client){
    console.log('connection');
    client.on('create', function (room) {
        console.log('Join the room');
        client.in(room.name).emit('event', room);
        client.join(room.name);
    });
    client.on('disconnect', function(room){
        console.log("Disconnected....");
    });

    client.on('leave', function(room){
        console.log("Client is leaving....Active rooms are...");
        // This is are active rooms.
        console.log(io.nsps['/'].adapter.rooms);
        console.log('Client is leaving from ',io.nsps['/'].adapter.rooms[room.name], 'room');
        /*
          Rooms in socket.io are implicitly created and implicitly deleted.
          Basically they are automatically removed when they are empty.
          */
        client.leave(room.name);
        console.log('#########################################');
        //io.sockets.clients('room');
    });
});


server.listen(3000);


app.get('/getURL', function(req, res, next) {
    res.send('respond with a resource.');
  });
