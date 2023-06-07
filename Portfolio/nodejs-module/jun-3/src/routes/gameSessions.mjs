import fs from 'fs/promises';
import gameSessions from '../db/gameSessions.json' assert { type: 'json' };

export const readGameSession = (req, res) => {
  const data = gameSessions[req.session.username];
  delete data.wordToGuess;
  res.send(data);
};

export const createGameSession = async (req, res) => {
  const wordToGuess = (
    await (await fetch('https://random-word-api.herokuapp.com/word')).json()
  )[0];

  const dataToWrite = {
    ...gameSessions,
    [req.session.username]: {
      wordToGuess: wordToGuess,
      chosenLetters: '',
      lastChosenLetter: '',
      remainingGuessAttempts: 6,
      gameStatus: 'running',
    },
  };
  await fs.writeFile(
    'src/db/gameSessions.json',
    JSON.stringify(dataToWrite, null, 2)
  );

  res.status(201).end();
};

export const updateGameSession = async (req, res) => {
  console.log(req.session);
  const id = req.session.username;

  if (!gameSessions[id].gameStatus === 'running') {
    res.send({
      error: true,
      message: `Session ${gameSessions[id].gameStatus}. Starts a new game.`,
    });
    return;
  }
  if (gameSessions[id].chosenLetters.includes(req.body.letter)) {
    res.send({
      error: true,
      message: `Letter '${req.body.letter}' already chosen. Please chosse another letter.`,
    });
    return;
  }
  gameSessions[id].lastChosenLetter = req.body.letter;
  gameSessions[id].chosenLetters += req.body.letter;
  if (
    !gameSessions[id].wordToGuess.includes(gameSessions[id].lastChosenLetter)
  ) {
    gameSessions[id].remainingGuessAttempts -= 1;
    if (gameSessions[id].remainingGuessAttempts == 0)
      gameSessions[id].gameStatus = 'lost';
  }
  if (
    gameSessions[id].wordToGuess
      .split('')
      .every((letter) => gameSessions[id].chosenLetters.includes(letter))
  ) {
    gameSessions[id].gameStatus = 'won';
  }

  await fs.writeFile(
    'src/db/gameSessions.json',
    JSON.stringify(gameSessions, null, 2)
  );

  const data = { data: gameSessions[id] };
  delete data.data.wordToGuess;
  res.send(data);
};

export const deleteGameSession = async (req, res) => {
  const id = req.params.id;

  if (req.session['gameSessionId'] != id) {
    res.send({ error: true, message: 'Cannot delete this game session' });
    return;
  }
  if (!gameSessions[id]) {
    res.send({ error: true, message: `Game session ${id} not found` });
    return;
  }
  delete gameSessions[id];
  await fs.writeFile(
    'src/db/gameSessions.json',
    JSON.stringify(gameSessions, null, 2)
  );
  res.end();
};
