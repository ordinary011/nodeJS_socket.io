const socket = io('http://127.0.0.1:3000');

const messageInput = document.getElementById('messageInput');
const handle = document.getElementById('handle');
const btnSend = document.getElementById('send');
const output = document.getElementById('output');
const feedback = document.getElementById('feedback');

btnSend.addEventListener('click', () => {
	socket.emit('chat', {
		messageInput: messageInput.value,
		handle: handle.value
    });
});

messageInput.addEventListener('keypress', () => {
	socket.emit('typing', handle.value);
});

socket.on('chat', data => {
    output.innerHTML += `<p><strong>${data.handle}:</strong> ${data.messageInput}</p>`;
    feedback.innerHTML = '';
});

socket.on('typing', data => {
	feedback.innerHTML = `<p>${data} is typing</p>`;
});
