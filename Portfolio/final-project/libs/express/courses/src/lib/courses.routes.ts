import express, { Router } from 'express';
import * as controller from './courses.controller';

export const router: Router = express.Router();

// get all courses
router.get('/', controller.readAll);
