import express from 'express';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: The authentication managing API
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *              password:
 *                type: string
 *            required:
 *              - email
 *              - password
 *     responses:
 *       200:
 *         description: User logged in.
 *       401:
 *         description: Wrong credentials.
 *       500:
 *         description: Some server error.
 *
 */
router.post('/login', (req, res) => {
  res.send('Hello World!');
});

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *              password:
 *                type: string
 *            required:
 *              - email
 *              - password
 *     responses:
 *       201:
 *         description: User signed up.
 *       401:
 *         description: Wrong fields.
 *       500:
 *         description: Some server error.
 *
 */
router.post('/signup', (req, res) => {
  res.send('Hello World!');
});

export { router as auth };
