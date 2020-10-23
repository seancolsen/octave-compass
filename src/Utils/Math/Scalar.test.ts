import {Scalar} from "./Scalar";

test('wrap between 0 and target', () => {
  expect(Scalar.wrap(150, 100)).toBe(50);
  expect(Scalar.wrap(-2, 100)).toBe(98);
  expect(Scalar.wrap(0, 100)).toBe(0);
  expect(Scalar.wrap(100, 100)).toBe(0);
  expect(Scalar.wrap(1050, 100)).toBe(50);
  expect(() => Scalar.wrap(100, 0)).toThrow();
});

test('wrap at negative zero', () => {
  expect(Scalar.wrap(-0, 1)).toBe(0);
});

test('wrap between two targets', () => {
  expect(Scalar.wrap(150, -100, 100)).toBe(-50);
  expect(Scalar.wrap(-2, -100, 100)).toBe(-2);
  expect(Scalar.wrap(-102, -100, 100)).toBe(98);
  expect(Scalar.wrap(102, -100, 100)).toBe(-98);
  expect(Scalar.wrap(0, -100, 100)).toBe(0);
  expect(Scalar.wrap(100, -100, 100)).toBe(-100);
  expect(Scalar.wrap(-100, -100, 100)).toBe(-100);
  expect(Scalar.wrap(-507, -50, 50)).toBe(-7);
  expect(Scalar.wrap(507, -50, 50)).toBe(7);
  expect(() => Scalar.wrap(100, 10, 10)).toThrow();
});

test('wrapToOctave', () => {
  expect(Scalar.wrapToOctave(0)).toBe(0);
  expect(Scalar.wrapToOctave(-1)).toBe(11);
  expect(Scalar.wrapToOctave(2)).toBe(2);
  expect(Scalar.wrapToOctave(13)).toBe(1);
  expect(Scalar.wrapToOctave(12)).toBe(0);
});
