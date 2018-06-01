import ChordSet from "Utils/Music/ChordSet";
import Chord from "Utils/Music/Chord";
import IntervalSet from "Utils/Music/IntervalSet";

const majorChord = new Chord(0b000010010001);
const dominant7Chord = new Chord(0b010010010001);
const diminishedChord = new Chord(0b0000001001001);

const majorAndDiminishedAt0 = new ChordSet([majorChord, diminishedChord], 0);

test('count', () => {
  expect(majorAndDiminishedAt0.count).toBe(2);
});

test('totalEmblemSize', () => {
  expect(majorAndDiminishedAt0.totalEmblemSize).toBeGreaterThan(0);
});

test('atOrdinal', () => {
  const majorScale = new IntervalSet(0b101010110101);
  expect(ChordSet.atOrdinal(majorScale, 7, [majorChord, dominant7Chord]).count)
    .toBe(2);
});
