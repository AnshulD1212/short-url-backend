import { validateUrl } from './validateUrl';

describe('validateUrl', () => {
  it('should validate http/https url', () => {
    const isValidUrl = validateUrl('https://www.google.com');
    expect(isValidUrl).toBe(true);
  });

  it('should invalidate url', () => {
    const isValidUrl = validateUrl('www.google.com');
    expect(isValidUrl).toBe(false);
  });
});
