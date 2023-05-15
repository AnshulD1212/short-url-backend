import { Request, Response } from 'express';
import { HttpStatusCode } from 'axios';
import { logger } from '../../helpers/logger';
import {
  getShortUrls,
  createShortUrlSrv,
  getShortUrlSrv
} from '../services/shortUrl.service';
import { validateUrl } from '../../utilities/validateUrl';

export const getShortUrlsController = async (req: Request, res: Response) => {
  try {
    const shortUrls = await getShortUrls();
    return res.status(HttpStatusCode.Ok).send(shortUrls);
  } catch (error) {
    logger.error(error);
    return res.status(HttpStatusCode.InternalServerError).send(error);
  }
};

export const createShortUrlController = async (req: Request, res: Response) => {
  try {
    const { url }: { url: string } = req.body;
    if (!url) {
      return res
        .status(HttpStatusCode.BadRequest)
        .send({ message: 'Invalid request' });
    }
    const isUrlValid = validateUrl(url);
    if (!isUrlValid) {
      return res
        .status(HttpStatusCode.BadRequest)
        .send({ message: 'Invalid url' });
    }
    const shortUrlDetails = await createShortUrlSrv(url);
    return res.status(HttpStatusCode.Created).send(shortUrlDetails);
  } catch (error) {
    logger.error(error);
    return res.status(HttpStatusCode.InternalServerError).send(error);
  }
};

export const redirectToOriginalUrlController = async (
  req: Request,
  res: Response
) => {
  try {
    const { shortUrl } = req.params;

    const shortUrlDetails = await getShortUrlSrv(shortUrl);

    return res.redirect(HttpStatusCode.TemporaryRedirect, shortUrlDetails.url);
  } catch (error) {
    logger.error(error);
    return res.sendStatus(HttpStatusCode.NotFound);
  }
};
