import express from 'express';
import { json } from 'body-parser';
import cors from 'cors';

const createApp = (): express.Application => {
  const app = express();
  app.use(cors());
  app.use(json());

  return app;
};

export default createApp
