const express = require('express');
const app = express();
const port = 3000;
const caseCinematografiche = require('./data/caseCinematografiche.json');

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/case-cinematografiche', (req, res) => {
  res.send(caseCinematografiche);
});

app.get('/case-cinematografiche/ricerca/:nome', (req, res) => {
  const result = caseCinematografiche.filter((casa) =>
    casa.nome.toLowerCase().includes(req.params.nome.toLowerCase())
  );
  result.length == 0
    ? res.status(404).send('Sorry, cant find that')
    : res.send(result);
});

app.delete('/case-cinematografiche/:id', (req, res) => {
  const index = caseCinematografiche.findIndex(
    (cc) => cc.id === parseInt(req.params.id)
  );
  if (index == -1) res.status(404).end();
  else {
    caseCinematografiche.splice(index, 1);
    res.status(200).end();
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
