/*
  env: https://coderrocketfuel.com/article/how-to-load-environment-variables-from-a-.env-file-in-nodejs
*/

import express from 'express';
import cors from 'cors';
import {
  checkCredentials,
  readAllStudents,
  readGroupStudents,
} from './routesHandlers.mjs';

const app = express();
const port = 3000;

app.use(express.json());
// permit loading resources from any origins (browsers)
app.use(cors());

app.get('/digitazon/2023/02/students', checkCredentials, readAllStudents);
app.get(
  '/digitazon/2023/02/group/4/students',
  checkCredentials,
  readGroupStudents
);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
