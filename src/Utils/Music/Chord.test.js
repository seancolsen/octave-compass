import Chord from "Utils/Music/Chord";

const major0Binary = 0b000010010001;
const major1Binary = 0b000100001001;
const major2Binary = 0b001000100001;

test('constructor major0', () => {
  const major0 = new Chord(major0Binary);
  expect(major0.binary).toBe(major0Binary);
  expect(major0.inversion).toBe(0);
});

test('constructor major1', () => {
  const major1 = new Chord(major1Binary);
  expect(major1.binary).toBe(major1Binary);
  expect(major1.inversion).toBe(1);
});

test('constructor major2', () => {
  const major2 = new Chord(major2Binary);
  expect(major2.binary).toBe(major2Binary);
  expect(major2.inversion).toBe(2);
});

test('constructor called for non-existent chord', () => {
  expect(() => {new Chord(0b111111111111)}).toThrow();
});

test('names', () => {
  const major0 = new Chord(major0Binary);
  expect(major0.names).toContain('major');
});

