import { IntervalSet } from './IntervalSet';

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

test('intervals major chord', () => {
  expect(IntervalSet.fromBinary(0b000010010001).intervals.map(i => i.shortName))
    .toEqual(['1', '3', '5']);
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

test('shift', () => {
  expect(IntervalSet.fromBinary(0b101100111000).shift(0).binary).toBe(0b101100111000);
  expect(IntervalSet.fromBinary(0b101100111000).shift(-0).binary).toBe(0b101100111000);
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
  const ordinals: number[] = [];
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

test('count', () => {
  expect(IntervalSet.fromBinary(0b111111111111).count).toBe(12);
  expect(IntervalSet.fromBinary(0b101010110101).count).toBe(7);
  expect(IntervalSet.fromBinary(0).count).toBe(0);
});


test('inversions', () => {
  expect(IntervalSet.fromBinary(0b000010010001).modes.map(is => is.binary))
    .toEqual([0b000010010001, 0b000100001001, 0b001000100001]);
});

test('modeShiftsToBeIdenticalTo', () => {
  const major0 = IntervalSet.fromBinary(0b000010010001);
  const major1 = IntervalSet.fromBinary(0b000100001001);
  const major2 = IntervalSet.fromBinary(0b001000100001);
  const diminished0 = IntervalSet.fromBinary(0b0000001001001);
  expect(major0.modeShiftsToBeIdenticalTo(major1)).toBe(1);
  expect(major0.modeShiftsToBeIdenticalTo(major2)).toBe(2);
  expect(major0.modeShiftsToBeIdenticalTo(diminished0)).toBeNull();
});

test('all binary values should be masked against chromatic', () => {
  expect(IntervalSet.fromBinary(0b111111111111111111).binary)
    .toBe(0b111111111111);
});

test('modeShift', () => {
  expect(IntervalSet.fromBinary(2873).modeShift(0).binary).toBe(2873);
  expect(IntervalSet.fromBinary(2873).modeShift(1).binary).toBe(871);
  expect(IntervalSet.fromBinary(2873).modeShift(-1).binary).toBe(1651);
  expect(IntervalSet.fromBinary(2873).modeShift(6).binary).toBe(1651);
  expect(IntervalSet.fromBinary(2873).modeShift(7).binary).toBe(2873);
});

test('modeShift of a set with no tonal center should go to the 1st available ordinal', () => {
  expect(IntervalSet.fromBinary(2872).modeShift(0).binary).toBe(359);
});

test('analysis of sus2 and sus4 chords', () => {
  const binarySus4Chord = 161;
  const binarySus2Chord = 133;
  const sus2Chord = new IntervalSet(binarySus2Chord);
  const sus4Chord = new IntervalSet(binarySus4Chord);
  const sus2ChordA = sus2Chord.analyzed;
  const sus4ChordA = sus4Chord.analyzed;
  expect(sus4Chord.isChord).toBeUndefined();
  expect(sus4Chord.isScale).toBeUndefined();
  expect(sus4Chord.invertedChords).toBeUndefined();
  expect(sus4Chord.scale).toBeUndefined();
  expect(sus4Chord.isAnalyzed).toBe(false);
  expect(sus4ChordA.isAnalyzed).toBe(true);
  expect(sus4ChordA.scale).toBe(undefined);
  expect(sus4ChordA.invertedChords?.length).toBe(2);
  expect(sus4ChordA.invertedChords?.[0].chord.binary).toBe(binarySus4Chord);
  expect(sus4ChordA.invertedChords?.[0].inversion).toBe(0);
  expect(sus4ChordA.invertedChords?.[1].chord.binary).toBe(binarySus2Chord);
  expect(sus4ChordA.invertedChords?.[1].inversion).toBe(2);
  expect(sus4ChordA.isChord).toBe(true);
  expect(sus4ChordA.isScale).toBe(false);
  expect(sus2ChordA.name.full).toBe('Suspended 2 Chord');
  expect(sus4ChordA.name.full).toBe('Suspended 4 Chord');
});

test('analysis of a major scale', () => {
  const majorScale = 2741;
  const majorScaleA = (new IntervalSet(majorScale)).analyzed;
  expect(majorScaleA.invertedChords).toEqual([]);
  expect(majorScaleA.scale?.defaultName).toBe('Major');
  expect(majorScaleA.scale?.defaultName).toBe('Major');
  expect(majorScaleA.isChord).toBe(false);
  expect(majorScaleA.isScale).toBe(true);
  expect(majorScaleA.name.full).toBe("Major Scale");
});

test('analysis of an unknown scale', () => {
  const unknownScale = 2047;
  const unknownScaleA = (new IntervalSet(unknownScale)).analyzed;
  expect(unknownScaleA.invertedChords).toEqual([]);
  expect(unknownScaleA.scale).toBeUndefined();
  expect(unknownScaleA.isChord).toBe(false);
  expect(unknownScaleA.isScale).toBe(false);
  expect(unknownScaleA.name.full).toBe("Scale 2047");
});

test('noteNameSetSignatures', () => {
  expect(IntervalSet.fromBinary(2741).noteNameSetSignatures).toEqual([
    "nnnnnnn",
    "ffnfffn",
    "nnsnnns",
    "fnnffnn",
    "nssnnss",
    "nnnfnnn",
    "sssnsss",
    "nnnnnns",
    "ffnffnn",
    "nnsnnss",
    "fnnfnnn",
    "nssnsss"
  ]);
});
