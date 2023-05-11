import { expressAPI } from '../../../app';
import supertest from 'supertest';
import { HttpStatusCode } from 'axios';

import {
  getCreatorById,
  getCreators,
  createCreator,
  updateCreatorById,
  deleteCreatorById
} from '../services/creator.service';
import { mockCreators } from '../../__mocks__/creator.mock';
import { Creator } from '../../types/creator';

jest.mock('../services/creator.service');

const app = expressAPI();
const request = supertest(app);

describe('get all creators', () => {
  it('should return all creators', async () => {
    (getCreators as jest.Mock).mockResolvedValue(mockCreators);
    return request
      .get('/creator')
      .expect(HttpStatusCode.Ok)
      .expect(({ body }) => {
        expect(body).toHaveLength(2);
        expect(body).toMatchObject(mockCreators);
      });
  });
});

describe('get a creator', () => {
  it('should return a creator', async () => {
    (getCreatorById as jest.Mock).mockResolvedValue(mockCreators[0]);
    return request
      .get('/creator/1')
      .expect(HttpStatusCode.Ok)
      .expect(({ body }) => {
        expect(body).toMatchObject(mockCreators[0]);
      });
  });
  it('should return a 404 if creator not found', async () => {
    (getCreatorById as jest.Mock).mockResolvedValue(undefined);
    return request.get('/creator/3').expect(HttpStatusCode.NotFound);
  });
});

describe('create a creator', () => {
  it('should create a creator', async () => {
    (createCreator as jest.Mock).mockResolvedValue(mockCreators[0]);
    return request
      .post('/creator')
      .send({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@creatorsconnect.com',
        username: 'johndoe'
      })
      .expect(HttpStatusCode.Created)
      .expect(({ body }) => {
        expect(body).toMatchObject(mockCreators[0]);
      });
  });
});

describe('update a creator', () => {
  it('should update a creator by id', async () => {
    const mockUpdatedCreator: Creator = {
      ...mockCreators[0],
      firstName: 'trevor'
    };
    (updateCreatorById as jest.Mock).mockResolvedValue(mockUpdatedCreator);
    return request
      .patch('/creator/1')
      .send({
        firstName: 'trevor'
      })
      .expect(HttpStatusCode.Ok)
      .expect(({ body }) => {
        expect(body).toMatchObject(mockUpdatedCreator);
      });
  });
});

describe('delete a creator', () => {
  it('should delete a creator', async () => {
    (deleteCreatorById as jest.Mock).mockResolvedValue(
      'Creator with id 1 deleted'
    );
    return request.delete('/creator/1').expect(HttpStatusCode.Ok);
  });
});
