import IntervalSet from 'Utils/Music/IntervalSet';
import Chord from "Utils/Music/Chord";

test('ordinalsToBinary', () => {
  expect(IntervalSet.ordinalsToBinary([])).toEqual(0b0);
  expect(IntervalSet.ordinalsToBinary([0])).toEqual(0b1);
  expect(IntervalSet.ordinalsToBinary([1])).toEqual(0b10);
  expect(IntervalSet.ordinalsToBinary([0, 4, 7])).toEqual(0b000010010001);
});

test('binaryToOrdinals', () => {
  expect(IntervalSet.binaryToOrdinals(0b0)).toEqual([]);
  expect(IntervalSet.binaryToOrdinals(0b1)).toEqual([0]);
  expect(IntervalSet.binaryToOrdinals(0b10)).toEqual([1]);
  expect(IntervalSet.binaryToOrdinals(0b000010010001)).toEqual([0, 4, 7]);
});

test('ordinals empty', () => {
  expect(IntervalSet.fromBinary(0b000000000000).ordinals).toEqual([]);
});

test('ordinals full', () => {
  expect(IntervalSet.fromBinary(0b111111111111).ordinals)
    .toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
});

test('ordinals major chord', () => {
  expect(IntervalSet.fromBinary(0b000010010001).ordinals)
    .toEqual([0, 4, 7]);
});

test('isActive', () => {
  expect(IntervalSet.fromBinary(0b000010010001).isActive(0)).toBe(true);
  expect(IntervalSet.fromBinary(0b000010010001).isActive(1)).toBe(false);
  expect(IntervalSet.fromBinary(0b000010010001).isActive(2)).toBe(false);
  expect(IntervalSet.fromBinary(0b000010010001).isActive(3)).toBe(false);
  expect(IntervalSet.fromBinary(0b000010010001).isActive(4)).toBe(true);
  expect(IntervalSet.fromBinary(0b000010010001).isActive(5)).toBe(false);
  expect(IntervalSet.fromBinary(0b000010010001).isActive(6)).toBe(false);
  expect(IntervalSet.fromBinary(0b000010010001).isActive(7)).toBe(true);
  expect(IntervalSet.fromBinary(0b000010010001).isActive(8)).toBe(false);
  expect(IntervalSet.fromBinary(0b000010010001).isActive(9)).toBe(false);
  expect(IntervalSet.fromBinary(0b000010010001).isActive(10)).toBe(false);
  expect(IntervalSet.fromBinary(0b000010010001).isActive(10)).toBe(false);
});

test('contains', () => {
  expect(IntervalSet.fromBinary(0b101010110101).contains(
    IntervalSet.fromBinary(0b000010010001))).toBe(true);
  expect(IntervalSet.fromBinary(0b000010010001).contains(
    IntervalSet.fromBinary(0b101010110101))).toBe(false);
  expect(IntervalSet.fromBinary(0b101010110101).contains(
    IntervalSet.fromBinary(0b000100100010))).toBe(false);
  expect(IntervalSet.fromBinary(0b111111111111).contains(
    IntervalSet.fromBinary(0b111111111111))).toBe(true);
  expect(IntervalSet.fromBinary(0b000000000000).contains(
    IntervalSet.fromBinary(0b000000000000))).toBe(true);
});

test('isIdenticalTo', () => {
  expect(IntervalSet.fromBinary(0b101010110101).isIdenticalTo(
    IntervalSet.fromBinary(0b101010110101))).toBe(true);
  expect(IntervalSet.fromBinary(0b101010110101).isIdenticalTo(
    IntervalSet.fromBinary(0b000010010001))).toBe(false);
});

test('shift(0)', () => {
  expect(IntervalSet.fromBinary(0b101100111000).shift(0).binary).toBe(0b101100111000);
  expect(IntervalSet.fromBinary(0b101100111000).shift(1).binary).toBe(0b011001110001);
  expect(IntervalSet.fromBinary(0b101100111000).shift(-1).binary).toBe(0b010110011100);
  expect(IntervalSet.fromBinary(0b101100111000).shift(6).binary).toBe(0b111000101100);
  expect(IntervalSet.fromBinary(0b101100111000).shift(-4).binary).toBe(0b100010110011);
});

test('fromArray major chord', () => {
  const ordinals = [0, 4, 7];
  expect(IntervalSet.fromOrdinals(ordinals).ordinals).toEqual(ordinals);
});

test('fromArray empty set', () => {
  const ordinals = [];
  expect(IntervalSet.fromOrdinals(ordinals).ordinals).toEqual(ordinals);
});

test('fromArray chromatic', () => {
  const ordinals = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  expect(IntervalSet.fromOrdinals(ordinals).ordinals).toEqual(ordinals);
});

test('toggleBinaryIntervals', () => {
  expect(IntervalSet.fromBinary(0b000010010001)
    .toggleBinaryIntervals(0b010010000000).binary)
    .toBe(0b010000010001);
});

test('toggleIntervalOrdinal', () => {
  expect(IntervalSet.fromBinary(0b000010010001).toggleIntervalOrdinal(10).binary)
    .toBe(0b010010010001);
  expect(IntervalSet.fromBinary(0b000010010001).toggleIntervalOrdinal(7).binary)
    .toBe(0b000000010001);
  expect(IntervalSet.fromBinary(0b000010010001).toggleIntervalOrdinal(0).binary)
    .toBe(0b000010010000);
});

test('compliment', () => {
  expect(IntervalSet.fromBinary(0b101010110101).compliment.binary)
    .toBe(0b010101001010);
  expect(IntervalSet.fromBinary(0b000000000000).compliment.binary)
    .toBe(0b111111111111);
  expect(IntervalSet.fromBinary(0b111111111111).compliment.binary)
    .toBe(0b000000000000);
});

test('chordSets', () => {
  const intervalSet = IntervalSet.fromBinary(0b101010110101);
  const possibleChords = [Chord.fromBinary(0b000010010001)];
  const chordSets = intervalSet.chordSets(possibleChords);
  expect(chordSets.map(chordSet => chordSet.count))
    .toEqual([1, 0, 0, 1, 1, 0, 0]);
});

test('count', () => {
  expect(IntervalSet.fromBinary(0b111111111111).count).toBe(12);
  expect(IntervalSet.fromBinary(0b101010110101).count).toBe(7);
  expect(IntervalSet.fromBinary(0).count).toBe(0);
});


test('inversions', () => {
  expect(IntervalSet.fromBinary(0b000010010001).inversions.map(
    intervalSet => intervalSet.binary)
  )
    .toEqual([0b000010010001, 0b000100001001, 0b001000100001]);
});

test('inversionsToBeIdenticalTo', () => {
  const major0 = IntervalSet.fromBinary(0b000010010001);
  const major1 = IntervalSet.fromBinary(0b000100001001);
  const major2 = IntervalSet.fromBinary(0b001000100001);
  const diminished0 = IntervalSet.fromBinary(0b0000001001001);
  expect(major0.inversionsToBeIdenticalTo(major1)).toBe(1);
  expect(major0.inversionsToBeIdenticalTo(major2)).toBe(2);
  expect(major0.inversionsToBeIdenticalTo(diminished0)).toBeNull();
});
