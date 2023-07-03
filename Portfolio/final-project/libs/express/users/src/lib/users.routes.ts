import express, { Router } from 'express';
import * as controller from './users.controller';
// import { isSeller, verifyToken } from './sellers.middleware';

export const router: Router = express.Router();

// router.use(verifyToken, isSeller);

// read all users
router.get('/', controller.readAll);
