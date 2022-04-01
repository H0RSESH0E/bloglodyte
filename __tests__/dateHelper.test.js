const { dateHelper, pluralHelper } = require('../utils/helpers');

test('format_date() returns a date string', () => {
  const date = new Date('2020-03-20 16:12:03');
  expect(dateHelper(date)).toBe('3/20/2020');
});

test('test plurals', () => {
  const non_plural = 'Sucker'
  expect(pluralHelper(non_plural, 1)).toBe('Sucker');
  expect(pluralHelper(non_plural, 2)).toBe('Suckers');
});


