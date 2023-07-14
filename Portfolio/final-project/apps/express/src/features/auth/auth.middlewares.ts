import jwt from 'jsonwebtoken';

export const verifyIsNotLogged = (req, res, next) => {
  const token = req.session.token;
  if (!token) return next();
  jwt.verify(token, process.env.JWT_TOKEN, (err) => {
    if (err) return next();
    return res.status(401).send({
      error: true,
      message: "Utente già autenticato. E' necessario effettuare il logout.",
    });
  });
};
