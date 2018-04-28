import Point from './Point.js';

const PI = Math.PI;
const THRESHOLD = 0.00000000000001;

test('constructor', () => {
  let p = new Point(1, 2);
  expect(p.x).toBe(1);
  expect(p.y).toBe(2);
});

test('fromXY', () => {
  let p = Point.fromXY(1, 2);
  expect(p.x).toBe(1);
  expect(p.y).toBe(2);
});

test('fromXYArray', () => {
  let p = Point.fromXYArray([1, 2]);
  expect(p.x).toBe(1);
  expect(p.y).toBe(2);
});

test('wrap', () => {
  expect(Point.wrap(150, 100)).toBe(50);
  expect(Point.wrap(-2, 100)).toBe(98);
  expect(Point.wrap(0, 100)).toBe(0);
  expect(Point.wrap(100, 100)).toBe(0);
  expect(Point.wrap(1050, 100)).toBe(50);
});

test('i_p', () => {
  expect(Point.i_p(0) - (PI / 2)).toBeLessThan(THRESHOLD);
  expect(Point.i_p(2) - (PI / 6)).toBeLessThan(THRESHOLD);
  expect(Point.i_p(3) - (0)).toBeLessThan(THRESHOLD);
  expect(Point.i_p(6) - (3 * PI / 2)).toBeLessThan(THRESHOLD);
  expect(Point.i_p(9) - (PI)).toBeLessThan(THRESHOLD);
});

test('fromIR', () => {
//  let p = Point.fromIR(0, 0);
//  expect(p.x).toBe(0);
//  expect(p.y).toBe(0);
});
