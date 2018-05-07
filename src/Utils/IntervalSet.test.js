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

