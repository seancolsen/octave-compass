import Scalar from "./Scalar.js";

test('wrap', () => {
  expect(Scalar.wrap(150, 100)).toBe(50);
  expect(Scalar.wrap(-2, 100)).toBe(98);
  expect(Scalar.wrap(0, 100)).toBe(0);
  expect(Scalar.wrap(100, 100)).toBe(0);
  expect(Scalar.wrap(1050, 100)).toBe(50);
});

test('wrapToOctave', () => {
  expect(Scalar.wrapToOctave(0)).toBe(0);
  expect(Scalar.wrapToOctave(-1)).toBe(11);
  expect(Scalar.wrapToOctave(2)).toBe(2);
  expect(Scalar.wrapToOctave(13)).toBe(1);
  expect(Scalar.wrapToOctave(12)).toBe(0);
});
