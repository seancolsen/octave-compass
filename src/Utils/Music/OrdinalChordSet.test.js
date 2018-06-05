import OrdinalChordSet from "Utils/Music/OrdinalChordSet";
import Chord from "Utils/Music/Chord";
import IntervalSet from "Utils/Music/IntervalSet";
import ChordSet from "Utils/Music/ChordSet";

const majorChord = Chord.fromBinary(0b000010010001);
const dominant7Chord = Chord.fromBinary(0b010010010001);

test('fromOrdinalWithinIntervalSet', () => {
  const majorScale = IntervalSet.fromBinary(0b101010110101);
  const chordSet = new ChordSet([majorChord, dominant7Chord]);
  const ordinalChordSet = OrdinalChordSet
    .fromOrdinalWithinIntervalSet(majorScale, 7, chordSet);
  expect(ordinalChordSet.chordSet.count)
    .toBe(2);
});

test('arrayFromIntervalSet', () => {
  const intervalSet = IntervalSet.fromBinary(0b101010110101);
  const setOfPossibleChords = new ChordSet([Chord.fromName('major')]);
  const ordinalChordSets = OrdinalChordSet.arrayFromIntervalSet(
    intervalSet, setOfPossibleChords
  );
  expect(ordinalChordSets.map(ocs => ocs.chordSet.count))
    .toEqual([1, 0, 0, 1, 1, 0, 0]);
});
