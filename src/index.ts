import { expressAPI } from './app';
import { AppDataSource } from './dataSource';
import { logger } from './helpers/logger';
import { redisClient } from './redis/client';
import { getLatestShortUrl } from './shortUrl/repository/shortUrl.repository';
import { shortUrlToNumber } from './utilities/shortUrlToNumber';

const port = Number(process.env.PORT) || 4000;

AppDataSource.initialize()
  .then(async () => {
    logger.info('Database connected successfully!');
    redisClient.on('error', err => logger.error(`Redis Client Error: ${err}`));

    await redisClient.connect();
    const lastShortUrl = await getLatestShortUrl();
    if (lastShortUrl) {
      redisClient.set('number', shortUrlToNumber(lastShortUrl.shortUrl) + 1);
    } else {
      redisClient.set('number', '10000');
    }
    expressAPI().listen(port, () => {
      logger.info(`Server started! on port ${port}`);
    });
  })
  .catch(err => {
    logger.error(`Error during Database connection: ${err}`);
  });
