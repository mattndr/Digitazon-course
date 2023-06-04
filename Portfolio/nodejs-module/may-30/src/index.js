// Fare in modo che le delete non cancellino mai i record dai database.

import express from 'express';
import * as resources from './routes/resources.mjs';
const app = express();
app.use(express.json());
const port = 3000;

app.get('/users', (req, res) => resources.read(req, res, 'users'));
app.get('/users/todos', (req, res) => resources.read(req, res, 'usersTodos'));
app.get('/users/:id', (req, res) => resources.readOne(req, res, 'users'));

app.post('/users', (req, res) => resources.create(req, res, 'users'));
app.put('/users/:id', (req, res) => resources.update(req, res, 'users'));
app.delete('/users/:id', (req, res) => resources.remove(req, res, 'users'));

app.get('/todos', (req, res) => resources.read(req, res, 'todos'));
app.get('/todos/:id', (req, res) => resources.readOne(req, res, 'todos'));
app.post('/todos', (req, res) => resources.create(req, res, 'todos'));
app.put('/todos/:id', (req, res) => resources.update(req, res, 'todos'));
app.delete('/todos/:id', (req, res) => resources.remove(req, res, 'todos'));

// To do
app.get('/users/:id/todos', (req, res) =>
  resources.readUserTodos(req, res, 'usersTodos')
);
app.post('/users/:idu/todos/:idt', (req, res) =>
  resources.createUserTodo(req, res, 'usersTodos')
);
app.delete('/users/:idu/todos/:idt', (req, res) =>
  resources.deleteUserTodo(req, res, 'usersTodos')
);
app.put('/users/:idu/todos/:idt/completed', (req, res) =>
  resources.completedUserTodo(req, res, 'usersTodos')
);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
