import Scalar from "./Scalar.js";

test('wrap', () => {
  expect(Scalar.wrap(150, 100)).toBe(50);
  expect(Scalar.wrap(-2, 100)).toBe(98);
  expect(Scalar.wrap(0, 100)).toBe(0);
  expect(Scalar.wrap(100, 100)).toBe(0);
  expect(Scalar.wrap(1050, 100)).toBe(50);
});
