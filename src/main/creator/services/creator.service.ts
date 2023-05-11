import { logger } from '../../../helpers/logger';
import { Creator, CreatorBody } from '../../types/creator';
import { mockCreators } from '../../__mocks__/creator.mock';

export const getCreators = async (): Promise<Creator[]> => {
  try {
    return mockCreators;
  } catch (err) {
    logger.error(err);
    throw err;
  }
};

export const getCreatorById = async (id: number): Promise<Creator> => {
  try {
    const creator = mockCreators.find(creator => creator.id === id);
    if (!creator) {
      throw new Error('Creator not found');
    }
    return creator;
  } catch (err) {
    logger.error(err);
    throw err;
  }
};

export const createCreator = async (data: CreatorBody): Promise<Creator> => {
  try {
    return {
      id: 3,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      username: data.username,
      verified: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      profilePhoto: 'https://picsum.photos/200'
    };
  } catch (err) {
    logger.error(err);
    throw err;
  }
};

export const updateCreatorById = async (
  id: number,
  data: Partial<CreatorBody>
): Promise<Creator> => {
  try {
    const creator = mockCreators.find(creator => creator.id === id);
    if (!creator) {
      throw new Error('Creator not found');
    }
    const updatedCreator = {
      ...creator,
      ...data,
      updatedAt: new Date().toISOString()
    };
    return updatedCreator;
  } catch (err) {
    logger.error(err);
    throw err;
  }
};

export const deleteCreatorById = async (id: number): Promise<string> => {
  try {
    const creator = mockCreators.find(creator => creator.id === id);
    if (!creator) {
      throw new Error('Creator not found');
    }
    return `Creator with id ${id} deleted`;
  } catch (err) {
    logger.error(err);
    throw err;
  }
};
