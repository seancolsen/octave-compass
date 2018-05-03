import Angle from './Angle.js';

const PI = Math.PI;

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

test('iToP', () => {
  expect(Angle.iToP(0)).toBeRoughly(PI / 2);
  expect(Angle.iToP(2)).toBeRoughly(PI / 6);
  expect(Angle.iToP(3)).toBeRoughly(0);
  expect(Angle.iToP(6)).toBeRoughly(3 * PI / 2);
  expect(Angle.iToP(9)).toBeRoughly(PI);
});

test('pToI', () => {
  expect(Angle.pToI(PI / 2)).toBeRoughly(0);
  expect(Angle.pToI(PI / 6)).toBeRoughly(2);
  expect(Angle.pToI(0)).toBeRoughly(3);
  expect(Angle.pToI(3 * PI / 2)).toBeRoughly(6);
  expect(Angle.pToI(PI)).toBeRoughly(9);
});
