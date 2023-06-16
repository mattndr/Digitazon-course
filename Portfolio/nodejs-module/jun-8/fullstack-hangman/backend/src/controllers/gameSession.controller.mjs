import * as service from '../services/gameSession.service.mjs';

export const readGameSession = async (req, res) => {
  console.log(req.session);
  const gameSession = await service.readGameSession(req.session.user);
  if (!gameSession) {
    res.send({
      data: {},
      error: true,
      message: 'No game found. Please start a new game.',
    });
    return;
  }
  if (!gameSession.gameStatus) delete gameSession.wordToGuess;
  res.send(gameSession);
};

export const createGameSession = async (req, res) => {
  const data = await service.createGameSession(req);
  res.status(201).send({ data });
};

export const updateGameSession = async (req, res) => {
  console.log(req.session);
  const gameSession = await service.readGameSession(req.session.user);

  if (!gameSession) {
    res.send({
      data: {},
      error: true,
      message: 'Please start a new game first',
    });
    return;
  }
  if (gameSession.remainingAttempts == 0 || gameSession.gameStatus.length > 0) {
    res.send({ data: {}, error: true, message: 'Please start a new game' });
    return;
  }

  let letter = req.body.letter;

  if (!letter || !letter.match(/[a-z]/i)) {
    res.send({ data: {}, error: true, message: 'Please enter a letter' });
    return;
  }

  letter = letter.toLowerCase();

  if (gameSession.chosenLetters.includes(letter)) {
    res.send({ data: {}, error: true, message: 'Please enter a new letter' });
    return;
  }

  gameSession.chosenLetters += letter;
  let letterMatches = gameSession.wordToGuess.includes(letter);

  if (!letterMatches) {
    gameSession.remainingAttempts -= 1;
    if (gameSession.remainingAttempts == 0) {
      gameSession.gameStatus = 'lost';
      await service.updateGameSession(req.session.user, gameSession);
      res.status(200).end();
      return;
    }
  }

  gameSession.wordToGuess.split('').forEach((char, i) => {
    if (gameSession.wordToGuess[i] == letter) {
      const updatedWord = gameSession.guessedLetters.split('');
      updatedWord[i] = letter;
      gameSession.guessedLetters = updatedWord.join('');
    }
  });

  if (gameSession.guessedLetters == gameSession.wordToGuess) {
    gameSession.gameStatus = 'won';
  }

  await service.updateGameSession(req.session.user, gameSession);
  res.status(200).end();
};
