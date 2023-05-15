import { AppDataSource } from '../../dataSource';
import { ShortUrlBody } from '../../types/shortUrl';
import { ShortUrl } from '../../entities/shortUrl.entity';

const shortUrlRepository = AppDataSource.getRepository(ShortUrl);

export const createShortUrl = async (shortUrl: ShortUrlBody) => {
  return shortUrlRepository.save(shortUrl);
};

export const getShortUrl = async (shortUrl: string) => {
  return shortUrlRepository.findOneBy({ shortUrl });
};

export const getAllShortUrls = async () => {
  return shortUrlRepository.find();
};

export const getShortUrlDetailsByUrl = async (url: string) => {
  return shortUrlRepository.findOneBy({ url });
};

export const updateShortUrl = async (id: number, shortUrl: ShortUrlBody) => {
  return shortUrlRepository.save({
    id,
    ...shortUrl
  });
};

export const getLatestShortUrl = async () => {
  return shortUrlRepository.findOne({
    where: {},
    order: { id: 'DESC' }
  });
};
