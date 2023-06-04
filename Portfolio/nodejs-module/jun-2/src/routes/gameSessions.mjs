import fs from 'fs/promises';
import gameSessions from '../db/gameSessions.json' assert { type: 'json' };

export const readGameSessions = (req, res) => {
  res.send(gameSessions);
};

export const createGameSession = async (req, res) => {
  const keys = Object.keys(gameSessions);
  let nextId = keys.length > 0 ? Math.max(...keys) + 1 : 1;
  const newWord = (
    await (await fetch('https://random-word-api.herokuapp.com/word')).json()
  )[0];
  const dataToWrite = {
    ...gameSessions,
    [nextId]: {
      wordToGuess: newWord,
      chosenLetters: '',
      lastChosenLetter: '',
      remainingGuessAttempts: 6,
      sessionStatus: 'Game running',
    },
  };
  if (nextId > 1 && req.session['gameSessionId'])
    gameSessions[nextId - 1].sessionStatus = 'Game abandoned';
  await fs.writeFile(
    'src/db/gameSessions.json',
    JSON.stringify(dataToWrite, null, 2)
  );
  req.session['gameSessionId'] = nextId;
  console.log(req.session);
  res.status(201).end();
};

export const readGameSession = async (req, res) => {
  const id = req.params.id;

  if (req.session['gameSessionId'] != id) {
    res.send({ error: true, message: 'Cannot get this game session' });
    return;
  }
  if (!gameSessions[id]) {
    res.send({ error: true, message: `Game session ${id} not found` });
    return;
  }
  res.send(gameSessions[id]);
};

export const updateGameSession = async (req, res) => {
  console.log(req.session['gameSessionId']);
  const id = req.params.id;

  if (req.session['gameSessionId'] != id) {
    res.send({ error: true, message: 'Cannot update this game session' });
    return;
  }
  if (!gameSessions[id]) {
    res.send({ error: true, message: `Session #${id} not found` });
    return;
  }
  if (!gameSessions[id].sessionStatus == 'Game running') {
    res.send({
      error: true,
      message: `${gameSessions[id].sessionStatus}. Starts a new game.`,
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
      gameSessions[id].sessionStatus = 'Game lost';
  }
  if (
    gameSessions[id].wordToGuess
      .split('')
      .every((letter) => gameSessions[id].chosenLetters.includes(letter))
  ) {
    gameSessions[id].sessionStatus = 'Game won';
  }

  await fs.writeFile(
    'src/db/gameSessions.json',
    JSON.stringify(gameSessions, null, 2)
  );
  res.send({ data: gameSessions[id] });
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
