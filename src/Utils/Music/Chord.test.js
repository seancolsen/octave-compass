import Chord from "Utils/Music/Chord";

test('constructor', () => {
  expect(new Chord(0b000010010001).binary).toBe(0b000010010001);
});

test('names', () => {
  expect(new Chord(0b000010010001).names).toContain('major');
});

test('inversions', () => {
  expect(new Chord(0b000010010001).inversions.map(chord => chord.binary))
    .toEqual([0b000010010001, 0b000100001001, 0b001000100001]);
});


