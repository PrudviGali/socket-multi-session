var server = require('http').createServer();
var io = require('socket.io')(server);

io.on('connection', function(client){
    console.log('connection');
    client.on('create', function (room) {
        console.log('Join the room');
        client.join(room);
        client.in(room).emit('event', room);
    });
    client.on('disconnect', function(){
        console.log("Disconnected....");
    });
});


server.listen(3000);