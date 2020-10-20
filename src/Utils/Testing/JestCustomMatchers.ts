import type { Point } from './../Geometry/Point';
import { CustomMath } from './../Math/CustomMath';

export function toBeRoughly(received: number, argument: number) {
  const pass = CustomMath.valuesAreWithinThreshold(received, argument);
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
}

declare global {
  namespace jest {
    interface Matchers<R, T> {
      toBeRoughly(a: number): R;
    }
  }
}

export function toBeTheSamePointAs(
    received: Point,
    argument: Point
  ) {
  const pass = received.roughlyEquals(argument);
  let r = JSON.stringify(received);
  let a = JSON.stringify(argument);
  let not = pass ? 'not' : '';
  let message = `expected ${r} to ${not}be the same point as ${a}`;
  return {
    message: () => message,
    pass: pass,
  };
}

declare global {
  namespace jest {
    interface Matchers<R, T> {
      toBeTheSamePointAs(a: Point): R;
    }
  }
}
