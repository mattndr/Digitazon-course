import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieSession from 'cookie-session';
import dotenv from 'dotenv';
import { router as auth } from '@final-project/express/auth';
import { router as courses } from '@final-project/express/courses';
import { router as users } from '@final-project/express/users';

// config file
dotenv.config({ path: __dirname + '../.env' });
if (process.env.DEBUG === 'false') {
  console.log = function () {
    return;
  };
}
const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();

async function startDbConnection() {
  try {
    await mongoose.connect(process.env.DB_URL);
    app.listen(port, host, () => {
      console.log(`[ ready ] http://${host}:${port}`);
    });
  } catch (error) {
    console.log(
      new Date().toLocaleString(),
      error.code
        ? `ERROR code: ${error.code}, codename: ${error.codeName}`
        : error
    );
    setTimeout(startDbConnection, 20000);
  }
}

startDbConnection();

app.use(express.json());
app.use(cors({ credentials: true, origin: true }));
// helps to stores the session data on the client within a cookie without requiring any database/resources on the server side
app.use(
  cookieSession({
    name: 'app-session',
    secret: process.env.COOKIE_SECRET,
    httpOnly: true,
    expires: new Date(
      Date.now() +
        process.env.COOKIE_LASTINGTIMEINMS.split('*').reduce(
          (tot, curr) => parseInt(curr) * tot,
          1
        )
    ),
  })
);
app.use((req, res, next) => {
  console.log(req.originalUrl);
  next();
});
app.use('/auth', auth);
app.use('/courses', courses);
app.use('/users', users);

app.get('/', (req, res) => {
  res.redirect('/login');
});
