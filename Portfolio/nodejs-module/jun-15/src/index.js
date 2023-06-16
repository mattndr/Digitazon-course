import express from 'express';
import { router as usersRoutes } from './users.routes.mjs';

const app = express();
const port = 3000;

app.use(express.json());

app.use('/users', usersRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
