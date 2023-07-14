import jwt from 'jsonwebtoken';

export const verifyIsLogged = (req, res, next) => {
  const token = req.session.token;
  if (!token) {
    return res.redirect(401, '/auth/login');
  }
  jwt.verify(token, process.env.JWT_TOKEN, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .send({ error: true, message: 'Utente non autenticato.' });
    }
    req.userId = decoded.id;
    next();
  });
};

export const getTokenIfPresent = (req, res, next) => {
  const token = req.session.token;
  jwt.verify(token, process.env.JWT_TOKEN, (err, decoded) => {
    if (err) {
      return next();
    }
    req.userId = decoded.id;
    next();
  });
};

// Ensure :id is matching id stored within token
export const verifyUserAuthorization = (req, res, next) => {
  const id = req.params.id;
  if (!(req.userId === id))
    return res
      .status(401)
      .send({ error: true, message: 'Utente non autorizzato.' });
  next();
};
