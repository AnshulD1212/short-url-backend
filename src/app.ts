import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import { HttpStatusCode } from 'axios';
import { creatorRoutes } from './main/creator/creator.routes';

export const expressAPI = (): express.Application => {
  const api = express();
  api.use(express.json());
  api.use(express.urlencoded({ extended: true }));
  // health check API
  api.get('/health', (req, res) => {
    res.status(HttpStatusCode.Ok).send('OK');
  });
  api.use('/creator', creatorRoutes);

  return api;
};
