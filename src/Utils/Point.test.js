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
  expect(Point.pr_xy([0, 1])).toBeTheSamePointAs([1, 0]);
  expect(Point.pr_xy([PI / 2, 1])).toBeTheSamePointAs([0, -1]);
  expect(Point.pr_xy([PI, 1])).toBeTheSamePointAs([-1, 0]);
  expect(Point.pr_xy([3 * PI / 2, 1])).toBeTheSamePointAs([0, 1]);
});

test('xy_pr', () => {
  expect(Point.xy_pr([0, 0])).toBeTheSamePointAs([0, 0]);
  expect(Point.xy_pr([1, 0])).toBeTheSamePointAs([0, 1]);
  expect(Point.xy_pr([0, -1])).toBeTheSamePointAs([PI / 2, 1]);
  expect(Point.xy_pr([-1, 0])).toBeTheSamePointAs([PI, 1]);
  expect(Point.xy_pr([0, 1])).toBeTheSamePointAs([3 * PI / 2, 1]);
});

test('ir_xy', () => {
  expect(Point.ir_xy([0, 1])).toBeTheSamePointAs([0, -1]);
  expect(Point.ir_xy([3, 1])).toBeTheSamePointAs([1, 0]);
  expect(Point.ir_xy([6, 1])).toBeTheSamePointAs([0, 1]);
  expect(Point.ir_xy([9, 1])).toBeTheSamePointAs([-1, 0]);
});

test('xy_ir', () => {
  expect(Point.xy_ir([0, -1])).toBeTheSamePointAs([0, 1]);
  expect(Point.xy_ir([1, 0])).toBeTheSamePointAs([3, 1]);
  expect(Point.xy_ir([0, 1])).toBeTheSamePointAs([6, 1]);
  expect(Point.xy_ir([-1, 0])).toBeTheSamePointAs([9, 1]);
});
