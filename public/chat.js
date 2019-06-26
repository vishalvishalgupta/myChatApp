var socket = io.connect('http://localhost:4001');

var handle = document.getElementById('handle');
var message = document.getElementById('message');
var send = document.getElementById('send');
var output = document.getElementById('output');
var feedback = document.getElementById('feedback');

send.addEventListener('click', function() {
    $('.emojionearea-editor')[0].innerText = ""
    socket.emit('chat', {
        message: message.value,
        handle: handle.value
    })
})

$(document).ready(function() {
    $('#message').emojioneArea({
        pickerPosition: "middle"
    })
})

message.addEventListener('keypress', function() {
    socket.emit('typing', {
        handle: handle.value
    });
})

socket.on('chat', function(data) {
    feedback.innerHTML = '';
    output.innerHTML += '<p><strong>' + data.handle + '<strong/>: ' + data.message + '<p/>'
})

socket.on('typing', function(data) {
    feedback.innerHTML = '<p><em>' + data.handle + " is typing..." + '</em></p>'
})
