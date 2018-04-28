import Point from './Point.js';

const PI = Math.PI;
const THRESHOLD = 0.00000000000001;

expect.extend({
  toBeRoughly(received, argument) {
    const pass = Math.abs(received - argument) < THRESHOLD;
    if (pass) {
      return {
        message: () =>
          `expected ${received} to not be roughly equal to ${argument}`,
        pass: true,
      };
    }
    else {
      return {
        message: () => `expected ${received} to be roughly equal to ${argument}`,
        pass: false,
      };
    }
  },
});

expect.extend({
  toBeTheSamePointAs(reveived, argument) {
    const pass =
      Math.abs(reveived[0] - argument[0]) < THRESHOLD &&
      Math.abs(reveived[1] - argument[1]) < THRESHOLD;
    if (pass) {
      return {
        message: () =>
          `expected ${received} to not be the same point as ${argument}`,
        pass: true,
      };
    }
    else {
      return {
        message: () => `expected ${received} to be the same point as ${argument}`,
        pass: false,
      };
    }
  }
});

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
  expect(Point.i_p(0)).toBeRoughly(PI / 2);
  expect(Point.i_p(2)).toBeRoughly(PI / 6);
  expect(Point.i_p(3)).toBeRoughly(0);
  expect(Point.i_p(6)).toBeRoughly(3 * PI / 2);
  expect(Point.i_p(9)).toBeRoughly(PI);
});

test('p_i', () => {
  expect(Point.p_i(PI / 2)).toBeRoughly(0);
  expect(Point.p_i(PI / 6)).toBeRoughly(2);
  expect(Point.p_i(0)).toBeRoughly(3);
  expect(Point.p_i(3 * PI / 2)).toBeRoughly(6);
  expect(Point.p_i(PI)).toBeRoughly(9);
});

test('ir_pr', () => {
  expect(Point.ir_pr([3, 1])).toBeTheSamePointAs([0, 1]);
});

test('pr_ir', () => {
  expect(Point.pr_ir([0, 1])).toBeTheSamePointAs([3, 1]);
});

test('pr_xy', () => {
  expect(Point.pr_xy([0, 0])).toBeTheSamePointAs([0, 0]);
});

test('xy_pr', () => {
  expect(Point.xy_pr([0, 0])).toBeTheSamePointAs([0, 0]);
});

test('fromIR', () => {
//  let p = Point.fromIR(0, 0);
//  expect(p.x).toBe(0);
//  expect(p.y).toBe(0);
});
