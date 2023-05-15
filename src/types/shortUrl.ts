import { ShortUrl } from '../entities/shortUrl.entity';

export type ShortUrlBody = Omit<ShortUrl, 'id' | 'updatedAt' | 'createdAt'>;
