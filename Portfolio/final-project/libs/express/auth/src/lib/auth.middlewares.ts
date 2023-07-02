import jwt from 'jsonwebtoken';

export function verifyToken(req, res, next) {
  const token = req.session.token;
  if (!token) {
    return res
      .status(403)
      .send({ data: {}, error: true, message: 'Nessun token fornito.' });
  }
  jwt.verify(token, process.env.JWT_TOKEN, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .send({ data: {}, error: true, message: 'Utente non autorizzato.' });
    }
    console.log(decoded);

    req.userId = decoded.id;
    req.sellerId = decoded.sellerId ? decoded.sellerId : '';
    next();
  });
}
