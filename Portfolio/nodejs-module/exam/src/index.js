import express from 'express';
import cors from 'cors';
import { router as photos } from './photos/routes.mjs';
import { router as albums } from './albums/routes.mjs';

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.use('/photos', photos);
app.use('/albums', albums);

app.get('/', (req, res) => {
  res.send(
    'This server exposes APIs to perform CRUD operations on photo and album assets.'
  );
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
