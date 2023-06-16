import express from 'express';
import * as controller from './users.controller.mjs';
const router = express.Router();

router.get('/', controller.readUsers);
router.get('/:userId', controller.readUser);

export { router };
