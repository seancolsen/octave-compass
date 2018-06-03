import ChordSet from "Utils/Music/ChordSet";
import Chord from "Utils/Music/Chord";

const majorChord = Chord.fromBinary(0b000010010001);
const diminishedChord = Chord.fromBinary(0b0000001001001);

const majorAndDiminished = new ChordSet([
  majorChord,
  diminishedChord
]);

test('count', () => {
  expect(majorAndDiminished.count).toBe(2);
});

test('totalEmblemSize', () => {
  expect(majorAndDiminished.totalEmblemSize).toBeGreaterThan(0);
});
