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
  toBeTheSamePointAs(received, argument) {
    const pass =
      Math.abs(received[0] - argument[0]) < THRESHOLD &&
      Math.abs(received[1] - argument[1]) < THRESHOLD;
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

test('iToP', () => {
  expect(Point.iToP(0)).toBeRoughly(PI / 2);
  expect(Point.iToP(2)).toBeRoughly(PI / 6);
  expect(Point.iToP(3)).toBeRoughly(0);
  expect(Point.iToP(6)).toBeRoughly(3 * PI / 2);
  expect(Point.iToP(9)).toBeRoughly(PI);
});

test('pToI', () => {
  expect(Point.pToI(PI / 2)).toBeRoughly(0);
  expect(Point.pToI(PI / 6)).toBeRoughly(2);
  expect(Point.pToI(0)).toBeRoughly(3);
  expect(Point.pToI(3 * PI / 2)).toBeRoughly(6);
  expect(Point.pToI(PI)).toBeRoughly(9);
});

test('irToPr', () => {
  expect(Point.irToPr([3, 1])).toBeTheSamePointAs([0, 1]);
});

test('prToIr', () => {
  expect(Point.prToIr([0, 1])).toBeTheSamePointAs([3, 1]);
});

test('prToXy', () => {
  expect(Point.prToXy([0, 0])).toBeTheSamePointAs([0, 0]);
  expect(Point.prToXy([0, 1])).toBeTheSamePointAs([1, 0]);
  expect(Point.prToXy([PI / 2, 1])).toBeTheSamePointAs([0, -1]);
  expect(Point.prToXy([PI, 1])).toBeTheSamePointAs([-1, 0]);
  expect(Point.prToXy([3 * PI / 2, 1])).toBeTheSamePointAs([0, 1]);
});

test('xyToPr', () => {
  expect(Point.xyToPr([0, 0])).toBeTheSamePointAs([0, 0]);
  expect(Point.xyToPr([1, 0])).toBeTheSamePointAs([0, 1]);
  expect(Point.xyToPr([0, -1])).toBeTheSamePointAs([PI / 2, 1]);
  expect(Point.xyToPr([-1, 0])).toBeTheSamePointAs([PI, 1]);
  expect(Point.xyToPr([0, 1])).toBeTheSamePointAs([3 * PI / 2, 1]);
});

test('irToXy', () => {
  expect(Point.irToXy([0, 1])).toBeTheSamePointAs([0, -1]);
  expect(Point.irToXy([3, 1])).toBeTheSamePointAs([1, 0]);
  expect(Point.irToXy([6, 1])).toBeTheSamePointAs([0, 1]);
  expect(Point.irToXy([9, 1])).toBeTheSamePointAs([-1, 0]);
});

test('xyToIr', () => {
  expect(Point.xyToIr([0, -1])).toBeTheSamePointAs([0, 1]);
  expect(Point.xyToIr([1, 0])).toBeTheSamePointAs([3, 1]);
  expect(Point.xyToIr([0, 1])).toBeTheSamePointAs([6, 1]);
  expect(Point.xyToIr([-1, 0])).toBeTheSamePointAs([9, 1]);
});
