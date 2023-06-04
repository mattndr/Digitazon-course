import express from 'express';
import * as globalRoutes from './routes/global-routes.mjs';

const app = express();
app.use(express.json());
const port = 3000;

app.get('/users', (req, res) => globalRoutes.readAll(req, res, 'users'));
app.get('/users/search', (req, res) =>
  globalRoutes.searchBy(req, res, 'users')
);
app.get('/users/:id', (req, res) => globalRoutes.readOne(req, res, 'users'));
app.post('/users', (req, res) => globalRoutes.create(req, res, 'users'));
app.put('/users/:id', (req, res) => globalRoutes.update(req, res, 'users'));
app.delete('/users/:id', (req, res) =>
  globalRoutes.deleteOne(req, res, 'users')
);

app.get('/todos', (req, res) => globalRoutes.readAll(req, res, 'todos'));
app.get('/todos/search', (req, res) =>
  globalRoutes.searchBy(req, res, 'todos')
);
app.get('/todos/:id', (req, res) => globalRoutes.readOne(req, res, 'todos'));
app.post('/todos', (req, res) => globalRoutes.create(req, res, 'todos'));
app.put('/todos/:id', (req, res) => globalRoutes.update(req, res, 'todos'));
app.delete('/todos/:id', (req, res) =>
  globalRoutes.deleteOne(req, res, 'todos')
);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
