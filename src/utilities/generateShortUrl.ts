export const generateShortUrl = (n: number): string => {
  if (n === 0) {
    return '0';
  }

  const digits =
    '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let shortUrl = '';

  while (n > 0) {
    shortUrl = digits[n % digits.length] + shortUrl;
    n = Math.floor(n / digits.length);
  }

  return shortUrl;
};
