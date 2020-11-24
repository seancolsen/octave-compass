import { IntervalSet } from "./IntervalSet";
import { intervalSetSearchPoints } from "./IntervalSetSearchPoints";

test('searchPoints', () => {
  const chromatic = intervalSetSearchPoints(IntervalSet.fromBinary(4095));
  const major = intervalSetSearchPoints(IntervalSet.fromBinary(2741));
  const minor = intervalSetSearchPoints(IntervalSet.fromBinary(1453));
  const mixolydian = intervalSetSearchPoints(IntervalSet.fromBinary(1717));
  const dorian = intervalSetSearchPoints(IntervalSet.fromBinary(1709));
  
  // expect([chromatic, major, minor, mixolydian]).toBe(0);
  expect(chromatic > major).toBe(true);
  expect(major > minor).toBe(true);
  expect(minor > mixolydian).toBe(true);
  expect(mixolydian > dorian).toBe(true);
});