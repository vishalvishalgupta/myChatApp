const express = require('express');
const socket = require('socket.io');

var app = express();

app.use(express.static('public'));

var server = app.listen('4001', function() {
    console.log('app is listening at port 4001');
})

var io = socket(server);

io.on('connection', function(socket) {
    console.log('Connection has been made successfully.', socket.id)
    socket.on('chat', function(data) {
        io.sockets.emit('chat', data);
    })

    socket.on('typing', function(data) {
        socket.broadcast.emit('typing', data);
    })
})