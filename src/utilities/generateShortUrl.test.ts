import { generateShortUrl } from './generateShortUrl';

describe('generateShortUrl', () => {
  it('should generate short url', () => {
    const shortUrl = generateShortUrl(352161460620);
    expect(shortUrl).toBe('6coNBco');
  });
});
