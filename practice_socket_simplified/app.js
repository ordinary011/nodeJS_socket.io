const express = require('express');
const socket = require('socket.io');

const app = express();
const server = app.listen(3000, () => {
    console.log('listening to requests on port 3000')
})

let io = socket(server);

io.on('connection', (socket) => {
    console.log(socket.id)
    io.emit('go', 'hi there');
    io.on('bro', (data) => {
        console.log(data)
    })
})



