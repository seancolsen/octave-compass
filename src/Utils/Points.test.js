import Points from './Points.js';

test('stringFromIR', () => {
  expect(Points.stringFromIR([
    [0, 0],
    [0, 0],
  ])).toBe('0,0 0,0');
});
