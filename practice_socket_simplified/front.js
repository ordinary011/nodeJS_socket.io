const socket = io('http://127.0.0.1:3000');

socket.on('go', data => {
	console.log(data);
});


// socket.emit('bro', 'jo bro')
