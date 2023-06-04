// scrivere un server che sia utilizzabile come backend nel gioco dellimpiccato.
// Il task e' volutamente sottospecificato, ci sono svariate decisioni da prendere.

import express from 'express';
const app = express();
app.use(express.json());
const port = 3000;

const word = 'cam'.split('');
const currentStatus = Array(word.length).fill('_');
const choosenLetters = new Set([]);
let remainingAttempts = 6;
let status = 'In game';

console.log(currentStatus);
app.get('/letters/:letter', (req, res) => {
  let letterInWord = false;
  let info = null;
  if (choosenLetters.has(req.params.letter))
    info = `Letter ${req.params.letter} already choosen`;
  else {
    choosenLetters.add(req.params.letter);
    for (let i = 0; i < word.length; i++) {
      if (word[i] == req.params.letter) {
        letterInWord = true;
        currentStatus[i] = word[i];
        if (currentStatus.join('') == word.join('')) status = 'You won';
      }
    }
    if (!letterInWord) {
      remainingAttempts--;
    }
    if (remainingAttempts == 0) {
      status = 'You lost';
    }
  }
  res.send({
    currentStatus: currentStatus.join(''),
    remainingAttempts,
    status,
    info,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

/*

/letters/:id

*/
