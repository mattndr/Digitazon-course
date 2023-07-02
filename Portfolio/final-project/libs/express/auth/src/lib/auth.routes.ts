import express, { Router } from 'express';
import * as controller from './auth.controller';
import { verifyToken } from './auth.middlewares';

export const router: Router = express.Router();

router.post('/login', controller.login);
router.post('/signup', controller.signup);
router.get('/logout', controller.logout);

router.post('/test', verifyToken, (req, res) => {
  res.end();
});
