const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const http = require('http');

mongoose.connect('mongodb://localhost/chatxxx', {useNewUrlParser: true});

const Chat = require('./models/Chat');

const Message = require('./models/Message');
const app = express();

let server = http.createServer(app);

app.set('views', './views');
app.set('view engine', 'pug');
app.use(express.static('./public'));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
const Session = session({secret: 'asasasasa', resave: false, saveUninitialized: false});
app.use(Session)

const io = require('socket.io')(server);
io.use((socket, next) => {
    Session(socket.request, socket.request.res, next);
})

io.on('connect', async (socket) => {

    const principal = socket.request.session.principal ? socket.request.session.principal : {name: "anonymous"}
    const chat = socket.request.session.chat ? socket.request.session.chat : await Chat.findById('5d50396d552c3538f0264538')

    socket.join(chat._id)

    socket.broadcast.to(chat._id).emit('alert', {
        author: 'Chat',
        text: `${principal.name}, connected`
    })

    io.to(socket.id).emit('alert', {
        author: 'Chat',
        text: `${principal.name}, Welcome to our chat`
    })

    io.to(socket.id).emit('init', await Message.find({chat: chat._id}))

    socket.on('message', async (msg) => {
        const message = await Message.create({
            text: msg.text,
            date: new Date(),
            author: principal.name,
            chat
        })
        io.to(chat._id).emit('message', message)
    })
})

app.get('/', (req, res, next) => {
    res.render('index')
})

app.get('/chats', async (req, res, next) => {
    let responseObj = {};
    responseObj.principal = req.session.principal ? req.session.principal : {name: "anonymous"}
    responseObj.chats = await Chat.find();
    res.render('chats', responseObj);
})

app.get('/chats/:id', async (req, res, next) => {
    const chat = await Chat.findById(req.params.id);
    req.session.chat = chat;
    res.render('chat', {chat})
})

app.post('/login', async (req, res, next) => {
    req.session.principal = {
        name: req.body.name
    }
    res.redirect('/chats')
})

app.post('/create-chat', async (req, res, next) => {
    const chat = await Chat.create(req.body);
    res.redirect('/chats')
})

server.listen(3000, () => console.log('listening on port 3000'));
