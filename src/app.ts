import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();
import { HttpStatusCode } from 'axios';
import { shortUrlRoutes } from './shortUrl/shortUrl.routes';
import { redirectToOriginalUrlController } from './shortUrl/controller/shortUrl.controller';
import { handleErrors } from './helpers/handleErrors';

export const expressAPI = (): express.Application => {
  const api = express();
  api.use(express.json());
  api.use(express.urlencoded({ extended: true }));
  api.use(cors());
  // health check API
  api.get('/health', (req, res) => {
    res.status(HttpStatusCode.Ok).send({ message: 'OK' });
  });

  api.use('/short-url', shortUrlRoutes);
  api.get('/:shortUrl', handleErrors(redirectToOriginalUrlController));

  return api;
};
