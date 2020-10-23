import { ordinalAbbreviation } from "./IntervalSetName";

test('ordinalAbbreviation', () => {
  expect(ordinalAbbreviation(0)).toBe('0th');
  expect(ordinalAbbreviation(1)).toBe('1st');
  expect(ordinalAbbreviation(2)).toBe('2nd');
  expect(ordinalAbbreviation(3)).toBe('3rd');
  expect(ordinalAbbreviation(4)).toBe('4th');
  expect(ordinalAbbreviation(22)).toBe('22nd');
})