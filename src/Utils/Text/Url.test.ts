import { Url } from "./Url";
import { IntervalSet } from "./../Music/IntervalSet";

test('normalize' , () => {
  expect(Url.normalize(' /234-8 ')).toBe('234-8');
});

test('parse simple', () => {
  const parts = Url.parse('1235-7');
  expect(parts.tonalCenter).toBe(7);
  expect(parts.intervalSet.binary).toBe(1235);
});

test('parse empty', () => {
  const parts = Url.parse('');
  expect(parts.tonalCenter).toBe(0);
  expect(parts.intervalSet.binary).toBe(0b101010110101);
});

test('generate', () => {
  const intervalSet = IntervalSet.fromBinary(1234);
  expect(Url.generate(intervalSet, 7)).toBe('1234-7');
});

test('invalid URLs should redirect to valid ones', () => {
  const parts = Url.parse('1234-13');
  expect(parts.tonalCenter).toBe(1);
  expect(parts.intervalSet.binary).toBe(1235);
});
