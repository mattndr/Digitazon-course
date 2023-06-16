import fs from 'fs/promises';
import { getRandomWord } from '../../utils/utils.js';

async function readGameSessions() {
  return JSON.parse(await fs.readFile('db/gameSessions.json', 'utf8'));
}

async function getNextSessionId() {
  return (
    Object.keys(await readGameSessions()).reduce(
      (highest, current) => (+current > +highest ? +current : +highest),
      0
    ) + 1
  );
}

export async function readGameSession(id) {
  const gameSession = (await readGameSessions())[id];
  if (!gameSession) return undefined;
  return gameSession;
}

export async function createGameSession(req) {
  const nextSessionId = req.session.user
    ? req.session.user
    : await getNextSessionId();
  const wordToGuess = getRandomWord();
  const dataToWrite = {
    ...(await readGameSessions()),
    [nextSessionId]: {
      wordToGuess,
      guessedLetters: Array(wordToGuess.length).fill('_').join(''),
      chosenLetters: '',
      remainingAttempts: 8,
      gameStatus: '',
    },
  };

  await fs.writeFile(
    'db/gameSessions.json',
    JSON.stringify(dataToWrite, null, 2)
  );

  req.session.user = nextSessionId;
  console.log(req.session);
  delete dataToWrite[nextSessionId].wordToGuess;
  return dataToWrite[nextSessionId];
}

export async function updateGameSession(id, updatedGameSession) {
  const dataToWrite = {
    ...(await readGameSessions()),
    [id]: updatedGameSession,
  };

  await fs.writeFile(
    'db/gameSessions.json',
    JSON.stringify(dataToWrite, null, 2)
  );
}
