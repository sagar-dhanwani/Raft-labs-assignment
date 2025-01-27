import express from 'express';
import { json } from 'body-parser';
import cors from 'cors';
import { setupSwagger } from './config/swagger';

const createApp = () => {
  const app = express();
  app.use(cors());
  app.use(json());

  // Setup Swagger
  setupSwagger(app);

  return app;
};

export default createApp;
