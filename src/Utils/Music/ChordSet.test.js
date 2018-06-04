import ChordSet from "Utils/Music/ChordSet";
import Chord from "Utils/Music/Chord";

const majorChord = Chord.fromBinary(0b000010010001);
const dominant7Chord = Chord.fromBinary(0b010010010001);
const diminishedChord = Chord.fromBinary(0b0000001001001);

const majorAndDiminished = new ChordSet([
  majorChord,
  diminishedChord
]);
const dominant7AndMajor = new ChordSet([
  dominant7Chord,
  majorChord,
]);

test('count', () => {
  expect(majorAndDiminished.count).toBe(2);
});

test('totalEmblemSize', () => {
  expect(majorAndDiminished.totalEmblemSize).toBeGreaterThan(0);
});

test('containsChord', () => {
  expect(majorAndDiminished.containsChord(majorChord)).toBe(true);
  expect(majorAndDiminished.containsChord(dominant7Chord)).toBe(false);
});

test('addChord', () => {
  expect(majorAndDiminished.addChord(dominant7Chord).count).toBe(3);
  expect(majorAndDiminished.addChord(majorChord).count).toBe(2);
});

test('removeChord', () => {
  expect(majorAndDiminished.removeChord(majorChord).count).toBe(1);
  expect(majorAndDiminished.removeChord(dominant7Chord).count).toBe(2);
});

test('toggleChord', () => {
  expect(majorAndDiminished.toggleChord(majorChord).count).toBe(1);
  expect(majorAndDiminished.toggleChord(dominant7Chord).count).toBe(3);
});

test('orderedChords', () => {
  expect(dominant7AndMajor.orderedChords.map(c => c.defaultName))
    .toEqual(['major', 'dominant 7']);
  expect(majorAndDiminished.orderedChords.map(c => c.defaultName))
    .toEqual(['major', 'diminished']);
});
