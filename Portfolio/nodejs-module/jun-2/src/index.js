import express from 'express';
import session from "express-session";

import {
  createGameSession,
  deleteGameSession,
  readGameSession,
  readGameSessions,
  updateGameSession,
} from './routes/gameSessions.mjs';
const app = express();
app.use(express.json());
const port = 3000;

app.use(
  session({
    name: 'session',
    keys: ['mySecretKey'],
  })
);

app.route('/gameSessions').get(readGameSessions).post(createGameSession);

app
  .route('/gameSessions/:id')
  .get(readGameSession)
  .put(updateGameSession)
  .delete(deleteGameSession);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
