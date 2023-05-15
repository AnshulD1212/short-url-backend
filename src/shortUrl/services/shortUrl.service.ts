import { logger } from '../../helpers/logger';
import { ShortUrlBody } from '../../types/shortUrl';
import { ShortUrl } from '../../entities/shortUrl.entity';
import {
  createShortUrl,
  getAllShortUrls,
  getShortUrl,
  getShortUrlDetailsByUrl,
  updateShortUrl
} from '../repository/shortUrl.repository';
import { redisClient } from '../../redis/client';
import { generateShortUrl } from '../../utilities/generateShortUrl';

export const getShortUrls = async (): Promise<ShortUrl[]> => {
  try {
    const shortUrls = await getAllShortUrls();
    return shortUrls;
  } catch (err) {
    logger.error(err);
    throw err;
  }
};

export const createShortUrlSrv = async (url: string): Promise<ShortUrl> => {
  try {
    let shortUrlDetails: ShortUrl | null;

    shortUrlDetails = await getShortUrlDetailsByUrl(url);
    if (shortUrlDetails) {
      shortUrlDetails.shortenedCount += 1;
      const updatedShortUrlDetails = await updateShortUrl(
        shortUrlDetails.id,
        shortUrlDetails
      );
      return updatedShortUrlDetails;
    }
    const number = await redisClient.get('number');
    const shortUrl = generateShortUrl(Number(number));
    redisClient.set('number', Number(number) + 1);

    const data: ShortUrlBody = {
      url,
      shortUrl,
      clickCount: 0,
      shortenedCount: 1
    };

    shortUrlDetails = await createShortUrl(data);

    return shortUrlDetails;
  } catch (err) {
    logger.error(err);
    throw err;
  }
};

export const getShortUrlSrv = async (shortUrl: string): Promise<ShortUrl> => {
  try {
    const shortUrlDetails = await getShortUrl(shortUrl);
    if (!shortUrlDetails) {
      throw new Error('Short URL not found');
    }
    shortUrlDetails.clickCount += 1;
    const updatedShortUrlDetails = await updateShortUrl(
      shortUrlDetails.id,
      shortUrlDetails
    );
    return updatedShortUrlDetails;
  } catch (err) {
    logger.error(err);
    throw err;
  }
};
