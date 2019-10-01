import { IntervalSetBinary } from "./IntervalSetBinary";

test('fromOrdinals', () => {
  expect(IntervalSetBinary.fromOrdinals([])).toEqual(0b0);
  expect(IntervalSetBinary.fromOrdinals([0])).toEqual(0b1);
  expect(IntervalSetBinary.fromOrdinals([1])).toEqual(0b10);
  expect(IntervalSetBinary.fromOrdinals([0, 4, 7])).toEqual(0b000010010001);
});

test('toOrdinals', () => {
  expect(IntervalSetBinary.toOrdinals(0b0)).toEqual([]);
  expect(IntervalSetBinary.toOrdinals(0b1)).toEqual([0]);
  expect(IntervalSetBinary.toOrdinals(0b10)).toEqual([1]);
  expect(IntervalSetBinary.toOrdinals(0b000010010001)).toEqual([0, 4, 7]);
});

test('guaranteedToContainTonalCenter', () => {
  expect(IntervalSetBinary.guaranteedToContainTonalCenter(0b000010010000))
    .toBe(0b000010010001);
  expect(IntervalSetBinary.guaranteedToContainTonalCenter(0b000010010001))
    .toBe(0b000010010001);
});
