import express from 'express';
import * as student from './students-routes.mjs';
import cors from 'cors';

const app = express();
const port = 3333;

app.use(express.json());
app.use(cors());

const secretKEy = '0020';

function checkKey(req, res, next) {
  if (req.headers.key == secretKEy) {
    next();
  } else {
    res.status(404).send({
      data: {},
      error: true,
      message: ':P hai sbagliato chiave',
    });
  }
}

app.get('/', student.firstPage);
app.get(
  '/digitazon/2023/02/group/4/students',
  checkKey,
  student.getGroupStudents
);
app.get('/digitazon/2023/02/students', checkKey, student.getCompleteRegister);
app.get('/key', student.showKey);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
