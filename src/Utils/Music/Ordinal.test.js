import Ordinal from "Utils/Music/Ordinal";

test('distance', () => {
  expect(Ordinal.distance(1, 1)).toBe(0);
  expect(Ordinal.distance(1, 2)).toBe(1);
  expect(Ordinal.distance(0, 12)).toBe(0);
  expect(Ordinal.distance(0, 11)).toBe(1);
  expect(Ordinal.distance(1, 11)).toBe(2);
  expect(Ordinal.distance(0, 6)).toBe(6);
  expect(Ordinal.distance(1, 7)).toBe(6);
  expect(Ordinal.distance(1, 8)).toBe(5);
  expect(Ordinal.distance(0, 24)).toBe(0);
  expect(Ordinal.distance(3, 27)).toBe(0);
  expect(Ordinal.distance(3, 28)).toBe(1);
  expect(Ordinal.distance(-1, -1)).toBe(0);
  expect(Ordinal.distance(-1, -2)).toBe(1);
  expect(Ordinal.distance(-1, -9)).toBe(4);
});

test('nearestValid', () => {
  expect(Ordinal.nearestValid(6, [4, 7])).toBe(7);
  expect(Ordinal.nearestValid(4.5, [-1, 12, 0, 18, 12, 13])).toBe(18);
  expect(Ordinal.nearestValid(2, [1, 3])).toBe(1);
  expect(Ordinal.nearestValid(0, [10, 11])).toBe(11);
});
