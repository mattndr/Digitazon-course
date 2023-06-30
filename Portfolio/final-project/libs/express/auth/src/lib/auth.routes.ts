import express, { Router } from 'express';
import * as controller from './auth.controller';
export const router: Router = express.Router();

router.post('/login', controller.login);
router.post('/signup', controller.signup);
