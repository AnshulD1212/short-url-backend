import { ShortUrlBody } from '../../types/shortUrl';
import { ShortUrl } from '../../entities/shortUrl.entity';
import {
  getShortUrls,
  createShortUrlSrv,
  getShortUrlSrv
} from './shortUrl.service';
import { mockShortUrls } from '../../__mocks__/shortUrl.mock';
import * as shortUrlRepository from '../repository/shortUrl.repository';
jest.mock('../repository/shortUrl.repository');

let redisClient: { quit: (arg0: jest.DoneCallback) => void };
describe('shortUrl services', () => {
  describe('get all shortUrls', () => {
    it('should return all shortUrls', async () => {
      jest
        .spyOn(shortUrlRepository, 'getAllShortUrls')
        .mockResolvedValue(mockShortUrls);
      const shortUrls = await getShortUrls();
      expect(shortUrls).toMatchObject(mockShortUrls);
    });
  });

  describe('create shortUrl', () => {
    it('should create a new shortUrl', async () => {
      const url: string = 'https://www.google.com';
      jest
        .spyOn(shortUrlRepository, 'createShortUrl')
        .mockResolvedValue(mockShortUrls[0]);
      const shortUrl = await createShortUrlSrv(url);
      expect(shortUrl).toMatchObject(mockShortUrls[0]);
    });

    it('should return existing shortUrl', async () => {
      const url: string = 'https://www.google.com';
      jest
        .spyOn(shortUrlRepository, 'getShortUrlDetailsByUrl')
        .mockResolvedValue(mockShortUrls[0]);
      const { shortenedCount, ...shortUrlOtherDetails } = mockShortUrls[0];
      jest.spyOn(shortUrlRepository, 'updateShortUrl').mockResolvedValue({
        shortenedCount: shortenedCount + 1,
        ...shortUrlOtherDetails
      });
      const shortUrl = await createShortUrlSrv(url);
      expect(shortUrl).toMatchObject({
        shortenedCount: 2,
        ...shortUrlOtherDetails
      });
    });
  });

  describe('get shortUrl', () => {
    it('should return short url details', async () => {
      const shortUrl: string = 'abc123';
      const { clickCount, ...shortUrlOtherDetails } = mockShortUrls[0];
      jest
        .spyOn(shortUrlRepository, 'getShortUrl')
        .mockResolvedValue(mockShortUrls[0]);

      jest.spyOn(shortUrlRepository, 'updateShortUrl').mockResolvedValue({
        clickCount: clickCount + 1,
        ...shortUrlOtherDetails
      });
      const shortUrlDetails = await getShortUrlSrv(shortUrl);
      expect(shortUrlDetails).toMatchObject({
        clickCount: 1,
        ...shortUrlOtherDetails
      });
    });

    it('should throw an error if short url not found', async () => {
      const shortUrl: string = 'xyz123';
      jest.spyOn(shortUrlRepository, 'getShortUrl').mockResolvedValue(null);
      expect(getShortUrlSrv(shortUrl)).rejects.toThrowError(
        'Short URL not found'
      );
    });
  });
});
