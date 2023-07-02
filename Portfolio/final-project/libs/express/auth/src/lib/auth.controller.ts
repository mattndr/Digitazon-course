import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { Buyer } from '@final-project/express/users/buyers';
import { Seller } from '@final-project/express/users/sellers';

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(404).send({
      data: {},
      error: true,
      message: 'Credenziali mancanti.',
    });
  }
  const user = await Buyer.findOne({ email }, { _id: 1, password: 1 }).exec();
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(404).send({
      data: {},
      error: true,
      message: 'Credenziali errate.',
    });
  }
  const seller = await Seller.findOne({ user: user.id }, { _id: 1 }).exec();
  const objToSign = seller
    ? { id: user.id, sellerId: seller.id }
    : { id: user.id };
  const token = jwt.sign(objToSign, process.env.JWT_TOKEN, {
    expiresIn: 86400 * 3, // 24*3 hours
  });
  req.session.token = token;
  res.end();
};

export const signup = async (req, res) => {
  const { email, password, phoneNumber } = req.body;
  if (!email || !password || !phoneNumber) {
    return res.status(404).send({
      data: {},
      error: true,
      message: 'Dato/i mancante/i. Inserire tutti i dati richiesti.',
    });
  }
  try {
    const user = new Buyer({
      email,
      password: await bcrypt.hash(password, 12),
      phoneNumber,
      registrationDate: new Date().toISOString(),
    });
    await user.save();
    res.status(201).send({ data: 'Utente creato' });
  } catch (err) {
    console.log(err);
    console.log('signup ERR_CODE:', err.code);
    res.status(409).send({
      data: {},
      error: true,
      message: 'Impossibile creare un account con i dati forniti.',
    });
  }
};

export const logout = async (req, res) => {
  req.session = null;
  res.end();
};
