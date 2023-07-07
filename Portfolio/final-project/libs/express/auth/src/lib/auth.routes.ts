import express, { Router } from 'express';
import * as controller from './auth.controller';
import { verifyIsNotLogged } from './auth.middlewares';
import { verifyIsLogged } from '@final-project/express/shared';

export const router: Router = express.Router();

// router.get('/login', (req, res) => res.send('login'));
router.post('/login', verifyIsNotLogged, controller.login);
// router.get('/signup', (req, res) => res.send('login'));
router.post('/signup', verifyIsNotLogged, controller.signup);
router.get('/logout', verifyIsLogged, controller.logout);