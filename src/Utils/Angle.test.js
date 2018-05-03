import Angle from './Angle.js';

test('iToD', () => {
  expect(Angle.iToD(-3)).toBe(-90);
  expect(Angle.iToD(0)).toBe(0);
  expect(Angle.iToD(3)).toBe(90);
  expect(Angle.iToD(6)).toBe(180);
  expect(Angle.iToD(12)).toBe(360);
});

test('dToI', () => {
  expect(Angle.dToI(-90)).toBe(-3);
  expect(Angle.dToI(0)).toBe(0);
  expect(Angle.dToI(90)).toBe(3);
  expect(Angle.dToI(180)).toBe(6);
  expect(Angle.dToI(360)).toBe(12);
});
