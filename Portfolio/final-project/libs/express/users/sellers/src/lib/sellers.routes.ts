import express, { Router } from 'express';
import * as controller from './sellers.controller';
import { isSeller, verifyToken } from './sellers.middleware';

export const router: Router = express.Router();

router.use(verifyToken, isSeller);

router.get('/', controller.readAll);
router.get('/courses', controller.readAll);

// creates a new Course
router.post('/courses', controller.create);

router.put('/courses', controller.readAll);
router.delete('/courses', controller.readAll);
