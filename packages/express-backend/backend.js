// backend.js
import express from 'express';
import cors from 'cors';
import userServices from '../mongoose-database/services/user-services.js';

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
	res.send('Hello World!');
});

const findUserById = (id) =>
	users['users_list'].find((user) => user['id'] === id);

const deleteUserById = (id) => {
	users['users_list'] = users['users_list'].filter(
		(user) => user['id'] !== id
	);
};

app.get('/users', (req, res) => {
	const name = req.query.name;
	const job = req.query.job;
	userServices
		.getUsers(name, job)
		.then((result) => {
			if (result) {
				res.status(200).send(result);
			} else {
				res.status(404).send('Resource not found.');
			}
		})
		.catch((error) => res.status(500).send(error));
});

app.get('/users/:id', (req, res) => {
	const id = req.params['id']; //or req.params.id
	userServices
		.findUserById(id)
		.then((result) => {
			if (result) {
				res.status(200).send(result);
			} else {
				res.status(404).send('Resource not found.');
			}
		})
		.catch((error) => res.status(500).send(error));
});

app.post('/users', (req, res) => {
	const userToAdd = req.body;
	userServices
		.addUser(userToAdd)
		.then((result) => res.status(201).send(result))
		.catch((error) => res.status(500).send(error));
});

app.delete('/users/:id', (req, res) => {
	const idToDelete = req.params['id'];
	userServices
		.findUserById(idToDelete)
		.then((result) => {
			if (result) {
				userServices
					.deleteUserById(idToDelete)
					.then(res.status(204).send());
			} else {
				res.status(404).send('Resource not found.');
			}
		})
		.catch((error) => res.status(500).send(error));
});

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
