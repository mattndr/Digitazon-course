/*
  env: https://coderrocketfuel.com/article/how-to-load-environment-variables-from-a-.env-file-in-nodejs
*/

import express from 'express';
import {
  checkCredentials,
  readAllStudents,
  readGroupStudents,
} from './routesHandlers.mjs';

const app = express();
const port = 3000;

app.use(express.json());

app.get('/digitazon/2023/02/students', checkCredentials, readAllStudents);
// :id
app.get(
  '/digitazon/2023/02/group/:id/students',
  checkCredentials,
  readGroupStudents
);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
