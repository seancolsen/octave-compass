import IntervalSet from 'Utils/IntervalSet';

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
  expect(new IntervalSet(0b000000000000).ordinals)
    .toEqual([]);
});

test('ordinals full', () => {
  expect(new IntervalSet(0b111111111111).ordinals)
    .toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
});

test('ordinals major chord', () => {
  expect(new IntervalSet(0b000010010001).ordinals)
    .toEqual([0, 4, 7]);
});

test('isActive', () => {
  expect(new IntervalSet(0b000010010001).isActive(0)).toBe(true);
  expect(new IntervalSet(0b000010010001).isActive(1)).toBe(false);
  expect(new IntervalSet(0b000010010001).isActive(2)).toBe(false);
  expect(new IntervalSet(0b000010010001).isActive(3)).toBe(false);
  expect(new IntervalSet(0b000010010001).isActive(4)).toBe(true);
  expect(new IntervalSet(0b000010010001).isActive(5)).toBe(false);
  expect(new IntervalSet(0b000010010001).isActive(6)).toBe(false);
  expect(new IntervalSet(0b000010010001).isActive(7)).toBe(true);
  expect(new IntervalSet(0b000010010001).isActive(8)).toBe(false);
  expect(new IntervalSet(0b000010010001).isActive(9)).toBe(false);
  expect(new IntervalSet(0b000010010001).isActive(10)).toBe(false);
  expect(new IntervalSet(0b000010010001).isActive(10)).toBe(false);
});

test('contains', () => {
  expect(new IntervalSet(0b101010110101).contains(
    new IntervalSet(0b000010010001))).toBe(true);
  expect(new IntervalSet(0b000010010001).contains(
    new IntervalSet(0b101010110101))).toBe(false);
  expect(new IntervalSet(0b101010110101).contains(
    new IntervalSet(0b000100100010))).toBe(false);
  expect(new IntervalSet(0b111111111111).contains(
    new IntervalSet(0b111111111111))).toBe(true);
  expect(new IntervalSet(0b000000000000).contains(
    new IntervalSet(0b000000000000))).toBe(true);
});
