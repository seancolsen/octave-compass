import Chord from "Utils/Music/Chord";

const major0Binary = 0b000010010001;
const major0 = new Chord(major0Binary);

test('constructor', () => {
  expect(major0.binary).toBe(major0Binary);
});

test('names', () => {
  expect(major0.names).toContain('major');
});

