import { Chord } from "./Chord";

const majorBinary = 0b000010010001;
const chromaticBinary = 0b111111111111;

test('constructor', () => {
  expect(Chord.fromBinary(majorBinary)?.name).toBe('Major');
});

test('fromBinary called for non-existent chord', () => {
  expect(() => Chord.fromBinary(chromaticBinary)).toThrow();
});

test('major chord, 1st inversion', () => {
  expect(() => Chord.fromBinary(265)).toThrow();
});

test('allChords', () => {
  expect(Chord.allChords.length).toBeGreaterThan(5);
});

test('fromName', () => {
  expect(Chord.fromName('Major')?.name).toBe('Major');
  expect(() => Chord.fromName('foobar')).toThrow();
});

test('intervalSet', () => {
  expect(Chord.fromBinary(majorBinary)?.intervalSet.binary).toBe(majorBinary);
});
