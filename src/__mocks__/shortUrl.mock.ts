import { ShortUrl } from '../entities/shortUrl.entity';

export const mockShortUrls: ShortUrl[] = [
  {
    id: 1,
    url: 'https://www.google.com',
    shortUrl: 'abc123',
    clickCount: 0,
    shortenedCount: 1,
    createdAt: '2021-01-01T00:00:00.000Z',
    updatedAt: '2021-01-01T00:00:00.000Z'
  },
  {
    id: 2,
    url: 'https://www.fb.com',
    shortUrl: 'def456',
    clickCount: 4,
    shortenedCount: 10,
    createdAt: '2021-01-01T00:00:00.000Z',
    updatedAt: '2021-01-01T00:00:00.000Z'
  }
];
