let caseCinematografiche = require('../data/caseCinematografiche.json');
const fs = require('fs');

let id = 0;
caseCinematografiche = caseCinematografiche.map((casa) => ({
  ...casa,
  id: ++id,
}));

fs.writeFile(
  '../data/caseCinematografiche.json',
  JSON.stringify(caseCinematografiche),
  (err) => {
    if (err) {
      console.error(err);
    }
    // file written successfully
  }
);
