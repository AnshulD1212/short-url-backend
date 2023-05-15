export const shortUrlToNumber = (s: string): number => {
  const digits =
    '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let number = 0;

  for (let i = 0; i < s.length; i++) {
    const p = digits.indexOf(s[i]);
    if (p < 0) {
      return NaN;
    }
    number += p * Math.pow(digits.length, s.length - i - 1);
  }

  return number;
};
