import { IntervalSetFactory } from "./IntervalSetFactory";

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
