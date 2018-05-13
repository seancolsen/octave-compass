import Scale from './Scale';

test('constructor', () => {
  expect(new Scale(0b101010110101).binary).toBe(0b101010110101);
});

test('names', () => {
  expect(new Scale(0b101010110101).names).toContain('Major');
});



