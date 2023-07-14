import express, { Router } from 'express';
import * as controller from './auth.controller';
import { verifyIsNotLogged } from './auth.middlewares';
import { verifyIsLogged } from '../shared/shared.middlewares';

export const router: Router = express.Router();

router.post('/login', verifyIsNotLogged, controller.login);

router.post('/signup', verifyIsNotLogged, controller.signup);

router.get('/logout', verifyIsLogged, controller.logout);
