var server = require('http').createServer();
var io = require('socket.io')(server);

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