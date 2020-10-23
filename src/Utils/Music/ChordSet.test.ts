import { ChordSet } from "./ChordSet";
import { Chord } from "./Chord";
import { IntervalSet } from "./IntervalSet";

const majorChord = Chord.fromBinary(0b000010010001);
const anotherMajorChord = Chord.fromBinary(0b000010010001);
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
const majorAndMajorAndDiminished = new ChordSet([
  majorChord,
  anotherMajorChord,
  diminishedChord
]);

test('count', () => {
  expect(majorAndDiminished.count).toBe(2);
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

test('uniqueChords', () => {
  expect(ChordSet.uniqueChords([majorChord, anotherMajorChord])
    .map(chord => chord.name)
  ).toEqual(['Major'])
});

test('sortedChords', () => {
  expect(ChordSet.sortedChords([dominant7Chord, majorChord])
    .map(chord => chord.name)
  ).toEqual(['Major', 'Dominant 7'])
});

test('ensure that chords are sorted and unique', () => {
  expect(dominant7AndMajor.chords.map(c => c.name))
    .toEqual(['Major', 'Dominant 7']);
  expect(majorAndDiminished.chords.map(c => c.name))
    .toEqual(['Major', 'Diminished']);
  expect(majorAndMajorAndDiminished.chords.map(c => c.name))
    .toEqual(['Major', 'Diminished']);
});

test('fromUnion', () => {
  expect(ChordSet.fromUnion([dominant7AndMajor, majorAndDiminished]).chords
    .map(chord => chord.name)
  ).toEqual(['Major', 'Diminished', 'Dominant 7'])
});

test('fromContainingIntervalSet dominant7Chord', () => {
  const dominant7Chord = IntervalSet.fromBinary(0b010010010001);
  const chordSet = ChordSet.fromContainingIntervalSet(dominant7Chord);
  expect(chordSet.chords.map(chord => chord.name))
    .toEqual(['Major', 'Diminished', 'Dominant 7']);
});

test('fromContainingIntervalSet chromatic', () => {
  const chordsInChromatic =
    ChordSet.fromContainingIntervalSet(IntervalSet.chromatic).chords;
  expect(chordsInChromatic.map(chord => chord.name))
    .toEqual(ChordSet.fromAllChords.chords.map(chord => chord.name));
});

test('fromAllChords', () => {
  expect(ChordSet.fromAllChords.count).toBeGreaterThan(5);
});

test('fromChordNames', () => {
  expect(ChordSet.fromChordNames([
    'Major',
    'Minor',
  ]).count).toBe(2);
});

test('fromDefaultChords', () => {
  expect(ChordSet.fromDefaultChords.count).toBeGreaterThan(1);
});

test('equals', () => {
  const setA = ChordSet.fromChordNames(['Major', 'Diminished']);
  const setB = ChordSet.fromChordNames(['Diminished', 'Major']);
  const setC = ChordSet.fromChordNames(['Major', 'Augmented']);
  expect(setA.equals(setB)).toBe(true);
  expect(setB.equals(setA)).toBe(true);
  expect(setA.equals(setC)).toBe(false);
  expect(setC.equals(setA)).toBe(false);
  expect(setB.equals(setC)).toBe(false);
  expect(setC.equals(setB)).toBe(false);
});
