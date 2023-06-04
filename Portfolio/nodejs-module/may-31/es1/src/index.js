// Partendo dal server che abbia almeno le rotte dell'utente:
//  * quando viene creato un utente tramite POST si deve fare una GET a questo indirizzo https://fakestoreapi.com/users/1, utilizzando l'id corretto, e completare tutti i campi dell'oggetto utente con cio' che si trova nella risposta dell'API.
// Se l'utente con quell'id non c'e' nelle fakestoreapi semplicemente lo lasciate con i dati che ha POSTato l'utente, quindi per come abbiamo visto fino ad ora solo con name e username
//  * proteggere le chiamate PUT e DELETE con un token che va specificato negli header, questo token deve contenere un "segreto" che e' specificato nel server, non vi preoccupate di criptare/crittografare/etc niente di tutto cio'. Questo e' il solito esempio di task di esplorazione della teoria. Quindi il token deve essere controllato nel server: controllarlo vuol dire verificare che nel server sia uguale a quanto specificato nel client.

import express from 'express';
import * as resources from './routes/resources.mjs';
const app = express();
app.use(express.json());
const port = 3000;

app.get('/users', (req, res) => resources.find(req, res, 'users'));
app.get('/users/:id', (req, res) => resources.findOne(req, res, 'users'));
app.post('/users', (req, res) => resources.create(req, res, 'users'));
app.put('/users/:id', (req, res) => resources.update(req, res, 'users'));
app.delete('/users/:id', (req, res) => resources.remove(req, res, 'users'));

app.get('/todos', (req, res) => resources.find(req, res, 'todos'));
app.get('/todos/:id', (req, res) => resources.findOne(req, res, 'todos'));
app.post('/todos', (req, res) => resources.create(req, res, 'todos'));
app.put('/todos/:id', (req, res) => resources.update(req, res, 'todos'));
app.delete('/todos/:id', (req, res) => resources.remove(req, res, 'todos'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
