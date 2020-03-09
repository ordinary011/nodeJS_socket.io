const socket = io();

const msgInput = document.getElementById('message-input')
const sendMsgBtn = document.getElementById('message-btn')
const messages = document.getElementById('messages')

sendMsgBtn.onclick = () => {
    const text = msgInput.value
    msgInput.value = '';

    socket.emit('message', {text})
}

socket.on('message', (msg) => {
    addMsg(msg)
})


socket.on('init', (messages) => {
    for (let message of messages) {
        addMsg(message)
    }
})

socket.on('alert', (alert) => {
    console.log(alert)
})

function addMsg(msg) {
    const singleMessage = document.createElement('div');
    singleMessage.classList.add('message');
    singleMessage.innerText = `${msg.date} ${msg.author} ${msg.text}`
    messages.appendChild(singleMessage)
}
