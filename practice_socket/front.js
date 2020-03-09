const socketM = io('http://127.0.0.1:3000');

socketM.on('fun', data => {
	console.log('***************');
	console.log(data);
	console.log('***************');
});

socketM.on('createUser1', data => {
	console.log('***************');
	console.log(data);
	console.log('***************');
});

const like = document.getElementById('like');

like.onclick = () => {
	socketM.emit('like', {
		photoId: 10,
		token: 'j5j345j34j534j5nj34'
	});
};

const add = document.getElementById('add');

add.onclick = () => {
	socketM.emit('createUser', {
        name: 'bro',
        surname: 'real'
	});
};
