import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

export const verifyIsLogged = (req, res, next) => {
  const token = req.session.token;
  if (!token) {
    return res.redirect(401, '/login');
    return res
      .status(401)
      .send({ error: true, message: 'Utente non autenticato.' });
  }
  jwt.verify(token, process.env.JWT_TOKEN, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .send({ error: true, message: 'Utente non autenticato.' });
    }
    console.log(decoded);
    req.userId = decoded.id;
    next();
  });
};

export const verifyAuthorization = (req, res, next) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send({ error: true, message: 'Id non valido.' });
  if (!(req.userId === id))
    return res
      .status(401)
      .send({ error: true, message: 'Utente non autorizzato.' });
  next();
};
