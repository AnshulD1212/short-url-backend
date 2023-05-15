import { expressAPI } from '../../app';
import supertest from 'supertest';
import { HttpStatusCode } from 'axios';

import {
  getShortUrls,
  createShortUrlSrv,
  getShortUrlSrv
} from '../services/shortUrl.service';
import { mockShortUrls } from '../../__mocks__/shortUrl.mock';

jest.mock('../services/shortUrl.service');

const app = expressAPI();
const request = supertest(app);

describe('get all shortUrls', () => {
  it('should return all shortUrls', async () => {
    (getShortUrls as jest.Mock).mockResolvedValue(mockShortUrls);
    return request
      .get('/short-url')
      .expect(HttpStatusCode.Ok)
      .expect(({ body }) => {
        expect(body).toHaveLength(2);
        expect(body).toMatchObject(mockShortUrls);
      });
  });
});

describe('create a shortUrl', () => {
  it('should create a shortUrl', async () => {
    (createShortUrlSrv as jest.Mock).mockResolvedValue(mockShortUrls[0]);
    return request
      .post('/short-url')
      .send({ url: 'https://www.google.com' })
      .expect(HttpStatusCode.Created)
      .expect(({ body }) => {
        expect(body).toMatchObject(mockShortUrls[0]);
      });
  });

  it('should throw error if url is not provided', async () => {
    return request
      .post('/short-url')
      .send({})
      .expect(HttpStatusCode.BadRequest)
      .expect(({ body }) => {
        expect(body).toMatchObject({
          message: 'Invalid request'
        });
      });
  });

  it('should throw error if url is not valid', async () => {
    return request
      .post('/short-url')
      .send({ url: 'www.google.com' })
      .expect(HttpStatusCode.BadRequest)
      .expect(({ body }) => {
        expect(body).toMatchObject({
          message: 'Invalid url'
        });
      });
  });
});

describe('redirect to original url', () => {
  it('should redirect to original url', async () => {
    (getShortUrlSrv as jest.Mock).mockResolvedValue(mockShortUrls[0]);
    return request.get('/abc123').expect(HttpStatusCode.TemporaryRedirect);
  });

  it('should throw error if shortUrl is not found', async () => {
    (getShortUrlSrv as jest.Mock).mockResolvedValue(undefined);
    return request.get('/xyz123').expect(HttpStatusCode.NotFound);
  });
});
