import IntervalSet from './IntervalSet';

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

test('toggleInterval', () => {
  expect(IntervalSet.fromBinary(0b000010010001).toggleInterval(10).binary)
    .toBe(0b010010010001);
  expect(IntervalSet.fromBinary(0b000010010001).toggleInterval(7).binary)
    .toBe(0b000000010001);
  expect(IntervalSet.fromBinary(0b000010010001).toggleInterval(0).binary)
    .toBe(0b000010010000);
});

test('fromArray major chord', () => {
  expect(IntervalSet.fromArray([0, 4, 7]).toArray()).toEqual([0, 4, 7]);
});

test('fromArray empty set', () => {
  expect(IntervalSet.fromArray([]).toArray()).toEqual([]);
});

test('fromArray chromatic', () => {
  const chromatic = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  expect(IntervalSet.fromArray(chromatic).toArray()).toEqual(chromatic);
});

test('compliment', () => {
  expect(IntervalSet.fromBinary(0b101010110101).compliment.binary)
    .toBe(0b010101001010);
  expect(IntervalSet.fromBinary(0b000000000000).compliment.binary)
    .toBe(0b111111111111);
  expect(IntervalSet.fromBinary(0b111111111111).compliment.binary)
    .toBe(0b000000000000);
});