import express from 'express';
import * as controller from '../controllers/gameSession.controller.mjs';

const router = express.Router();

router
  .route('/')
  .get(controller.readGameSession)
  .post(controller.createGameSession)
  .put(controller.updateGameSession);

export { router as gameSession };
