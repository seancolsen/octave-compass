import { Chord } from "./Chord";

const major0Binary = 0b000010010001;
const major1Binary = 0b000100001001;
const major2Binary = 0b001000100001;

test('fromBinary major0', () => {
  const major0 = Chord.fromBinary(major0Binary);
  expect(major0.binary).toBe(major0Binary);
  expect(major0.inversion).toBe(0);
});

test('fromBinary major1', () => {
  const major1 = Chord.fromBinary(major1Binary);
  expect(major1.binary).toBe(major1Binary);
  expect(major1.inversion).toBe(1);
});

test('fromBinary major2', () => {
  const major2 = Chord.fromBinary(major2Binary);
  expect(major2.binary).toBe(major2Binary);
  expect(major2.inversion).toBe(2);
});

test('fromBinary called for non-existent chord', () => {
  expect(() => {Chord.fromBinary(0b111111111111)}).toThrow();
});

test('names', () => {
  const major0 = Chord.fromBinary(major0Binary);
  expect(major0.names).toContain('Major');
});

test('allChords', () => {
  expect(Chord.allChords.length).toBeGreaterThan(5);
});

test('fromName', () => {
  expect(Chord.fromName('Major').defaultName).toBe('Major');
  expect(() => {Chord.fromName('foobar')}).toThrow();
});
