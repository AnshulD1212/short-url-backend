import { Creator } from '../types/creator';

export const mockCreators: Creator[] = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@creatorsconnect.com',
    username: 'johndoe',
    verified: true,
    createdAt: '2021-01-01T00:00:00.000Z',
    updatedAt: '2021-01-01T00:00:00.000Z',
    profilePhoto: 'https://picsum.photos/200'
  },
  {
    id: 2,
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jane.doe@creatorsconnect.com',
    username: 'janedoe',
    verified: true,
    createdAt: '2021-01-01T00:00:00.000Z',
    updatedAt: '2021-01-01T00:00:00.000Z',
    profilePhoto: 'https://picsum.photos/200'
  }
];
