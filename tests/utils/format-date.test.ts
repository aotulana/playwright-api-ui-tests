import { formatDate } from './format-date';

describe('formatDate', () => {
  test('should format the date correctly', () => {
    const date = new Date(1995, 11, 31);
    const formattedDate = formatDate(date);
    expect(formattedDate).toBe('1995-12-31');
  });

  test('should pad single-digit month and day with leading zeros', () => {
    const date = new Date('2022-1-9');
    const formattedDate = formatDate(date);
    expect(formattedDate).toBe('2022-01-09');
  });
});
