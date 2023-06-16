import express from 'express';
import cookieParser from 'cookie-parser';

const app = express();
const port = 3000;

app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
  console.log(req.cookies);
  if (!req.cookies.remember) res.cookie('remember', true);
  res.send('Hello World!');
});

app.get('/clear', (req, res) => {
  res.clearCookie('remember');
  res.status(204).end();
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
