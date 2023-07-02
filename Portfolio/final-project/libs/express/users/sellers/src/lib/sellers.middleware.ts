import { Seller } from './seller.schema';
import jwt from 'jsonwebtoken';

// export async function isSeller(req, res, next) {
//   if (!(await Seller.exists({ user: req.userId }).exec()))
//     return res
//       .status(401)
//       .send({ data: {}, error: true, message: 'Utente non autorizzato.' });
//   next();
// }

export async function isSeller(req, res, next) {
  if (!req.sellerId)
    return res
      .status(401)
      .send({ data: {}, error: true, message: 'Utente non autorizzato.' });
  next();
}

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
        .send({
          data: {},
          error: true,
          message: 'Token non valido. Utente non autorizzato.',
        });
    }
    console.log(decoded);

    req.userId = decoded.id;
    req.sellerId = decoded.sellerId ? decoded.sellerId : '';
    next();
  });
}
