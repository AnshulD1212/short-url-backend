import { shortUrlToNumber } from './shortUrlToNumber';

describe('shortUrlToNumber', () => {
  it('should convert short url to number', () => {
    const number = shortUrlToNumber('6coNBco');
    expect(number).toBe(352161460620);
  });
});
