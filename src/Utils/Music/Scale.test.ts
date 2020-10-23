import { Scale } from './Scale';

test('fromBinary', () => {
  expect(Scale.fromBinary(0b101010110101)?.binary).toBe(0b101010110101);
});

test('fromBinary called for non-existent scale', () => {
  expect(() => Scale.fromBinary(0b111111111110)).toThrow();
});

test('names', () => {
  expect(Scale.fromBinary(0b101010110101)?.names).toContain('Major');
  expect(Scale.fromBinary(0b101010110101)?.defaultName).toBe('Major');
  expect(Scale.fromBinary(0b101010110101)?.alternateNames).toContain('Ionian');
});

test('intervalSet', () => {
  expect(Scale.fromBinary(2741)?.intervalSet.binary).toBe(2741);
});