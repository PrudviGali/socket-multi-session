app.service('socketFactory', function() {
    // factory returns an object
    // you can run some code before
    var socket;
    var uniqueID = uuidv1(); // To generate unique IDs.
    var clients = ['client1', 'clinet2', 'client3', 'client4', 'client5'];
    // Just to select randpom number for demo purpose.
    // This should be ideally replaced with 'selecting different clients functionlaity'
    var randomNumber = Math.floor(Math.random() * (5) + 0);
    var room = {
        name: clients[randomNumber],
        sessionID : uniqueID
    };
    var makeSocketConnection = function() {
        // Create socket connection only if there is no socket connected already.
        if(!socket) {
            socket = io('http://localhost:3000');
            socket.on('connect', function () {
                socket.emit('create', room);
            });
        }
    };
    return {
        getSocket : function() {
            return socket;
        },
        room : room,
        makeSocketConnection: makeSocketConnection
    }
});