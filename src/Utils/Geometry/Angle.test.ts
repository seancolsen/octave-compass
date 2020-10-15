import { Angle } from './Angle';

import { toBeRoughly } from './../Testing/JestCustomMatchers';
expect.extend({toBeRoughly});

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

test('betweenAngles', () => {
  expect(Angle.betweenAngles(1, 1, 12)).toBe(0);
  expect(Angle.betweenAngles(1, 2, 12)).toBe(1);
  expect(Angle.betweenAngles(0, 12, 12)).toBe(0);
  expect(Angle.betweenAngles(0, 11, 12)).toBe(1);
  expect(Angle.betweenAngles(1, 11, 12)).toBe(2);
  expect(Angle.betweenAngles(0, 6, 12)).toBe(6);
  expect(Angle.betweenAngles(1, 7, 12)).toBe(6);
  expect(Angle.betweenAngles(1, 8, 12)).toBe(5);
  expect(Angle.betweenAngles(0, 24, 12)).toBe(0);
  expect(Angle.betweenAngles(3, 27, 12)).toBe(0);
  expect(Angle.betweenAngles(3, 28, 12)).toBe(1);
  expect(Angle.betweenAngles(-1, -1, 12)).toBe(0);
  expect(Angle.betweenAngles(-1, -2, 12)).toBe(1);
  expect(Angle.betweenAngles(-1, -9, 12)).toBe(4);
});

test('nearestValid', () => {
  expect(Angle.nearest(6, [4, 7], 12)).toBe(7);
  expect(Angle.nearest(4.5, [-1, 12, 0, 18, 12, 13], 12)).toBe(18);
  expect(Angle.nearest(2, [1, 3], 12)).toBe(1);
  expect(Angle.nearest(0, [10, 11], 12)).toBe(11);
});