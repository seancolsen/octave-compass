import Chord from "./Chord";

test('constructor', () => {
  expect(new Chord(0b000010010001).binary).toBe(0b000010010001);
});

