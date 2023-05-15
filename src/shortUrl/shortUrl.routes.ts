import express from 'express';
import { handleErrors } from '../helpers/handleErrors';
import {
  getShortUrlsController,
  createShortUrlController
} from './controller/shortUrl.controller';

const router: express.Router = express.Router();

router.get('/', handleErrors(getShortUrlsController));
router.post('/', handleErrors(createShortUrlController));

export const shortUrlRoutes = router;
