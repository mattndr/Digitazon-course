// creare un endpoint di registrazione al quale sia possibile registrare una coppia utente / password
// creare un endpoint di login al quale sia possibile loggarsi sul server
// creare un endpoint /session che ritorna i dettagli dell'utente se loggato,
// dopo 60 secondi che utente e' loggato viene automaticamente sloggato dal server

import express from 'express';
import * as auth from './routes/auth.mjs';
import sessions from 'express-session';

const app = express();
app.use(express.json());
const port = 3000;

//session middleware
app.use(
  sessions({
    secret: 'thisismysecrctekeyfhrgfgrfrty84fwir767',
    saveUninitialized: false,
    cookie: { maxAge: 60000 },
    resave: false,
  })
);

app.post('/login', auth.login);
app.post('/signup', auth.signup);
app.get('/sessions/:username', auth.session);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
