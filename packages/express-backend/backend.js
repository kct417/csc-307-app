// backend.js
import express from 'express';
import cors from 'cors';

const app = express();
const port = 8000;
const users = {
	users_list: [
		{
			id: 'xyz789',
			name: 'Charlie',
			job: 'Janitor',
		},
		{
			id: 'abc123',
			name: 'Mac',
			job: 'Bouncer',
		},
		{
			id: 'ppp222',
			name: 'Mac',
			job: 'Professor',
		},
		{
			id: 'yat999',
			name: 'Dee',
			job: 'Aspring actress',
		},
		{
			id: 'zap555',
			name: 'Dennis',
			job: 'Bartender',
		},
	],
};

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
	res.send('Hello World!');
});

const findUserByName = (name) => {
	return users['users_list'].filter((user) => user['name'] === name);
};

const findUserByJob = (job) => {
	return users['users_list'].filter((user) => user['job'] === job);
};

const findUserByNameAndJob = (name, job) => {
	return users['users_list'].filter(
		(user) => user['name'] === name && user['job'] === job
	);
};

const findUserById = (id) =>
	users['users_list'].find((user) => user['id'] === id);

const addUser = (user) => {
	users['users_list'].push(user);
	return user;
};

const deleteUserById = (id) => {
	users['users_list'] = users['users_list'].filter(
		(user) => user['id'] !== id
	);
};

const generateId = () => {
	const letters = 'abcdefghijklmnopqrstuvwxyz';
	const numbers = '1234567890';
	let id = '';

	for (let i = 0; i < 3; i++) {
		id += letters.charAt(Math.floor(Math.random() * letters.length));
	}

	for (let j = 0; j < 3; j++) {
		id += numbers.charAt(Math.floor(Math.random() * numbers.length));
	}

	return id;
};

app.get('/users', (req, res) => {
	const name = req.query.name;
	const job = req.query.job;
	if (name != undefined && job != undefined) {
		let result = findUserByNameAndJob(name, job);
		result = { users_list: result };
		res.send(result);
	} else if (name != undefined) {
		let result = findUserByName(name);
		result = { users_list: result };
		res.send(result);
	} else if (job != undefined) {
		let result = findUserByJob(job);
		result = { users_list: result };
		res.send(result);
	} else {
		res.send(users);
	}
});

app.get('/users/:id', (req, res) => {
	const id = req.params['id']; //or req.params.id
	let result = findUserById(id);
	if (result === undefined) {
		res.status(404).send('Resource not found.');
	} else {
		res.send(result);
	}
});

app.post('/users', (req, res) => {
	const userToAdd = req.body;
	const userFormatted = {
		id: generateId(),
		name: userToAdd.name,
		job: userToAdd.job,
	};
	addUser(userFormatted);
	res.status(201).send(userFormatted);
});

app.delete('/users/:id', (req, res) => {
	const idToDelete = req.params['id'];
	let result = findUserById(idToDelete);
	if (result === undefined) {
		res.status(404).send('Resource not found.');
	} else {
		deleteUserById(idToDelete);
		res.status(204).send();
	}
});

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
