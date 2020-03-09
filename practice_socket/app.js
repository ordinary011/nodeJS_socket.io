const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io').listen(server);
const mysql = require('mysql2');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'social'
})

io.on('connection', client => {
	console.log(`${client.id} is connected`);
	io.emit('fun', 'hello from event');
	client.on('like', data => {
        // console.log(data);
        addLikesToDB(data)
    });
    client.on('createUser', async data => {
        let u = await createUser(data)
        client.emit('createUser1', u)
	});
});

// _________________________

function addLikesToDB(data){
    const {token, photoId} = data;
    // verify token
    const sql = `INSERT INTO likes(photoId, like) VALUEs ("${photoId}", 1)`;
    console.log(sql)
}

async function createUser(data){
    const {name, surname} = data;
    let createUserQuery = `INSERT INTO user(name, surname, email, password, gender_id) VALUE ('${name}', '${surname}', 'artemkas2222@mail.ru', '1', 1);`
    let u = await db.promise().query(createUserQuery)
    return u;
}

server.listen(3000, () => {
	console.log(3000);
});
