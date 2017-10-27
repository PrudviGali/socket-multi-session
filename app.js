var app = angular.module('demo', []);

app.controller('loginController', function($scope, socketFactory){
    socketFactory.makeSocketConnection();
});
// We can use controller, service or factory based on the need.
app.controller('DemoCtrlOne', function($scope, socketFactory){
    var vm = this;
    var socket = socketFactory.getSocket();
    if(socket) {
        //register socket events only if socket is available
        socket.on('event', function (eventRoom) {
            console.log("Data from server....", eventRoom, socketFactory.room.name);
            if (eventRoom.name === socketFactory.room.name) {
                // If any other user enters the same client then close this connection or redirects the user.
                socket.disconnect();
            }
        });
        socket.on('disconnect', function() {
            document.querySelector('.controllerOne p').innerHTML = '<p>Disconnected socket connection!!!!!!</p>';
        });
    }
    $scope.disConnectSocketInContOne = function () {
        socket.disconnect();
    }
});

app.controller('DemoCtrlTwo', function($scope, socketFactory){
    var vm = this;
    var socket = socketFactory.getSocket();
    if(socket) {
        //register socket events only if socket is available
        socket.on('event', function (eventRoom) {
            console.log("Data from server....", eventRoom, socketFactory.room.name);
            if (eventRoom.name === socketFactory.room.name) {
                // If any other user enters the same client then close this connection or redirects the user.
                socket.disconnect();
            }
        });
        socket.on('disconnect', function() {
            document.querySelector('.controllerTwo p').innerHTML = '<p>Disconnected socket connection!!!!!!</p>';
        });
    }
    $scope.disConnectSocketInConTwo = function () {
        socket.disconnect();
    }
});