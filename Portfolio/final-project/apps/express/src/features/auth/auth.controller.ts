import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import {
  readOne as readUser,
  create as createUser,
} from '../users/users.service';
import {
  validateEmail,
  validatePassword,
  validatePhoneNumber,
} from './dataValidation';

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(404).send({
      error: true,
      message: 'Inserire email e password.',
    });
  }
  const user = await readUser({ email }, { password: 1 });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(404).send({
      error: true,
      message: 'Email e/o password non corrette.',
    });
  }
  const token = jwt.sign({ id: user.id }, process.env.JWT_TOKEN, {
    expiresIn: process.env.COOKIE_LASTINGTIMEINMS.split('*').reduce(
      (tot, curr) => parseInt(curr) * tot,
      1
    ),
  });
  req.session.token = token;
  res.send({ data: { userId: user.id } });
};

export const signup = async (req, res) => {
  const { email, password, phoneNumber } = req.body;
  const validationMessage = ['Controllare i seguenti campi: '];
  if (!validateEmail(email)) validationMessage.push('email');
  if (!validatePassword(password)) validationMessage.push('password');
  if (!validatePhoneNumber(phoneNumber))
    validationMessage.push('numero di telefono');
  if (validationMessage.length > 1) {
    return res.status(404).send({
      error: true,
      message: validationMessage.join(', ').replace(/: , /, ': [').concat(']'),
    });
  }
  if (
    await createUser({
      ...req.body,
      password: await bcrypt.hash(req.body.password, 12),
      registrationDate: new Date().toISOString(),
    })
  )
    res.status(201).end();
  else
    res.status(409).send({
      error: true,
      message: 'Errore: impossibile creare un account con i dati forniti.',
    });
};

export const logout = async (req, res) => {
  req.session = null;
  res.end();
};
