import Angle from './Angle.js';

test('i_d', () => {
  expect(Angle.i_d(-3)).toBe(-90);
  expect(Angle.i_d(0)).toBe(0);
  expect(Angle.i_d(3)).toBe(90);
  expect(Angle.i_d(6)).toBe(180);
  expect(Angle.i_d(12)).toBe(360);
});

test('d_i', () => {
  expect(Angle.d_i(-90)).toBe(-3);
  expect(Angle.d_i(0)).toBe(0);
  expect(Angle.d_i(90)).toBe(3);
  expect(Angle.d_i(180)).toBe(6);
  expect(Angle.d_i(360)).toBe(12);
});
