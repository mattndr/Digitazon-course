import express from 'express';
import cors from 'cors';
import { auth } from './routes/auth.route.mjs';
import { gameSession } from './routes/gameSession.route.mjs';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import session from 'express-session';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Hello World',
      version: '1.0.0',
    },
  },
  servers: [
    {
      url: 'http://localhost:3000',
    },
  ],
  apis: ['./src/routes/*.mjs'], // files containing annotations as above
};
const swaggerSpec = swaggerJsdoc(options);

const app = express();
const port = 3000;

// Populates req.session
app.use(
  session({
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    secret: 'keyboard cat',
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

// middlewares
app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:3001',
    methods: ['GET', 'PUT', 'POST'],
    credentials: true,
  })
);

app.use('/hangman', gameSession);
app.use('/auth', auth);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
