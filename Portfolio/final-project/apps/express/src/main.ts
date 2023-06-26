import express from 'express';
import {router as courses} from '@final-project/express/courses'
import mongoose from 'mongoose'

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();

// app.use('/courses', courses)

async function startDbConnection(){
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/project-db');
  } catch(error){
    console.log(error);
  }
}

startDbConnection()

app.get('/', (req, res) => {
  res.send({ message: 'Hello API' });
});

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
