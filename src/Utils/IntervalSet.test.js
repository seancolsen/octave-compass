import IntervalSet from './IntervalSet';

test('toArray empty', () => {
  expect(IntervalSet.fromBinary(0b000000000000).toArray())
    .toEqual([]);
});

test('toArray full', () => {
  expect(IntervalSet.fromBinary(0b111111111111).toArray())
    .toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
});

test('toArray major chord', () => {
  expect(IntervalSet.fromBinary(0b000010010001).toArray())
    .toEqual([0, 4, 7]);
});

test('shift(0)',() => {
  expect(IntervalSet.fromBinary(0b101100111000).shift(0).binary)
    .toBe(0b101100111000);
});

test('shift(1)', () => {
  expect(IntervalSet.fromBinary(0b101100111000).shift(1).binary)
    .toBe(0b011001110001);
});

test('shift(-1)', () => {
  expect(IntervalSet.fromBinary(0b101100111000).shift(-1).binary)
    .toBe(0b010110011100);
});

test('shift(6)', () => {
  expect(IntervalSet.fromBinary(0b101100111000).shift(6).binary)
    .toBe(0b111000101100);
});

test('shift(-4)', () => {
  expect(IntervalSet.fromBinary(0b101100111000).shift(-4).binary)
    .toBe(0b100010110011);
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
