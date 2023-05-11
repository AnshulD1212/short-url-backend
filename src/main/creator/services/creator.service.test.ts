import { Creator, CreatorBody } from '../../types/creator';
import { mockCreators } from '../../__mocks__/creator.mock';
import {
  getCreatorById,
  getCreators,
  createCreator,
  updateCreatorById,
  deleteCreatorById
} from './creator.service';

describe('creator services', () => {
  describe('get all creators', () => {
    it('should return all creators', async () => {
      const creators = await getCreators();
      expect(creators).toMatchObject(mockCreators);
    });
  });

  describe('get creator by id', () => {
    it('should return a creator', async () => {
      const id = 1;
      const creator = await getCreatorById(id);
      expect(creator).toMatchObject(mockCreators[0]);
    });
  });

  describe('create creator', () => {
    it('should create a creator', async () => {
      const data: CreatorBody = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@creatorsconnect.com',
        username: 'johndoe'
      };
      const creator = await createCreator(data);
      expect(creator).toHaveProperty('id', 3);
      expect(creator).toHaveProperty('firstName', data.firstName);
      expect(creator).toHaveProperty('lastName', data.lastName);
      expect(creator).toHaveProperty('email', data.email);
      expect(creator).toHaveProperty('username', data.username);
    });
  });

  describe('update creator by id', () => {
    it('should update a creator by id', async () => {
      const id = 1;
      const data: Partial<CreatorBody> = {
        firstName: 'trevor'
      };
      const creator = await updateCreatorById(id, data);
      expect(creator).toHaveProperty('id', id);
      expect(creator).toHaveProperty('firstName', data.firstName);
    });
  });

  describe('delete creator by id', () => {
    it('should delete a creator by id', async () => {
      const id = 1;
      const response = await deleteCreatorById(id);
      expect(response).toEqual(`Creator with id ${id} deleted`);
    });
  });
});
