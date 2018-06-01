import IntervalSetFactory from "Utils/Music/IntervalSetFactory";
import IntervalSet from "Utils/Music/IntervalSet";
import Chord from "Utils/Music/Chord";

test('fromBinary chord', () => {
  const set = IntervalSetFactory.fromBinary(0b000010010001);
  expect(set.binary).toBe(0b000010010001);
  expect(set.constructor.name).toBe('Chord');
});

test('fromBinary scale', () => {
  const set = IntervalSetFactory.fromBinary(0b101010110101);
  expect(set.binary).toBe(0b101010110101);
  expect(set.constructor.name).toBe('Scale');
});

test('fromBinary no chord or scale found', () => {
  const set = IntervalSetFactory.fromBinary(0b111111111000);
  expect(set.binary).toBe(0b111111111000);
  expect(set.constructor.name).toBe('IntervalSet');
});

test('shift(0)', () => {
  expect(
    IntervalSetFactory.fromShift(new IntervalSet(0b101100111000), 0).binary
  ).toBe(0b101100111000);
});

test('shift(1)', () => {
  expect(
    IntervalSetFactory.fromShift(new IntervalSet(0b101100111000), 1).binary
  ).toBe(0b011001110001);
});

test('shift(-1)', () => {
  expect(
    IntervalSetFactory.fromShift(new IntervalSet(0b101100111000), -1).binary
  ).toBe(0b010110011100);
});

test('shift(6)', () => {
  expect(
    IntervalSetFactory.fromShift(new IntervalSet(0b101100111000), 6).binary
  ).toBe(0b111000101100);
});

test('shift(-4)', () => {
  expect(
    IntervalSetFactory.fromShift(new IntervalSet(0b101100111000), -4).binary
  ).toBe(0b100010110011);
});

test('toggleInterval', () => {
  expect(IntervalSetFactory
    .fromToggledInterval(new IntervalSet(0b000010010001), 10).binary
  ).toBe(0b010010010001);
  expect(IntervalSetFactory
    .fromToggledInterval(new IntervalSet(0b000010010001), 7).binary
  ).toBe(0b000000010001);
  expect(IntervalSetFactory
    .fromToggledInterval(new IntervalSet(0b000010010001), 0).binary
  ).toBe(0b000010010000);
});

test('fromArray major chord', () => {
  expect(IntervalSetFactory.fromOrdinals([0, 4, 7]).ordinals).toEqual([0, 4, 7]);
});

test('fromArray empty set', () => {
  expect(IntervalSetFactory.fromOrdinals([]).ordinals).toEqual([]);
});

test('fromArray chromatic', () => {
  const chromatic = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  expect(IntervalSetFactory.fromOrdinals(chromatic).ordinals).toEqual(chromatic);
});

test('compliment', () => {
  expect(
    IntervalSetFactory.fromCompliment(new IntervalSet(0b101010110101)).binary
  ).toBe(0b010101001010);
  expect(
    IntervalSetFactory.fromCompliment(new IntervalSet(0b000000000000)).binary
  ).toBe(0b111111111111);
  expect(
    IntervalSetFactory.fromCompliment(new IntervalSet(0b111111111111)).binary
  ).toBe(0b000000000000);
});

test('chordSets', () => {
  const intervalSet = IntervalSetFactory.fromBinary(0b101010110101);
  const possibleChords = [new Chord(0b000010010001)];
  const chordSets = IntervalSetFactory.chordSets(intervalSet, possibleChords);
  expect(chordSets.map(chordSet => chordSet.count))
    .toEqual([1, 0, 0, 1, 1, 0, 0]);
});
