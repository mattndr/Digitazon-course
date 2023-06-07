'use strict';

/**
 * Module dependencies.
 */

import express from 'express';
import session from 'express-session';
import fs from 'fs/promises';
import users from './db/users.json' assert { type: 'json' };
import {
  createGameSession,
  readGameSession,
  updateGameSession,
} from './routes/gameSessions.mjs';

const app = express();

// middlewares
app.use(express.json());
// quando scrivo qualcosa nel file .json, il programma viene ricaricato e si perde la sessione corrente
app.use(
  session({
    resave: true, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    secret: 'shhhh, very secret',
  })
);

// functions
function checkUserIsLogged(req, res, next) {
  console.log(req.session);
  if (req.session.username) {
    next();
  } else {
    console.log('Not logged in');
    // res.redirect('/login');
    res.send({
      data: {},
      error: true,
      message: 'User not authenticated',
    });
  }
}

app.get('/', (req, res) => res.send({ data: {} }));

app.get('/gameSession', checkUserIsLogged, readGameSession);
app.post('/gameSession', checkUserIsLogged, createGameSession);
app.put('/gameSession', checkUserIsLogged, updateGameSession);

app.post('/auth/login', (req, res) => {
  const { username, password } = req.body;
  if (users[username] && users[username].password === password) {
    req.session.username = username;
    // res.redirect('/');
    res.status(200).end();
    return;
  }
  res.send({
    data: {},
    error: true,
    message: 'Authentication failed, please check your username and password',
  });
});

app.post('/auth/register', async (req, res) => {
  const { username, email = '', password = '12345' } = req.body;
  if (users[username]) {
    res.send({ error: true, message: 'User already registered' });
    return;
  }
  const dataToWrite = { ...users, [username]: { email, password } };
  await fs.writeFile(
    './src/db/users.json',
    JSON.stringify(dataToWrite, null, 2)
  );
  res.status(201).end();
});

app.get('/auth/logout', async (req, res) => {
  delete req.session.username;
  res.end();
});

app.listen(3000);
