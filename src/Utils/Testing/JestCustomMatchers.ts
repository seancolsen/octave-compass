function valuesAreWithinThreshold(
    v1: number, 
    v2: number, 
    threshold: number = 0.00000000000001
  ): boolean {
  return (Math.abs(v1 - v2) < threshold);
}

interface NumericalObject {
  [key: string]: number;
};

function objectValuesAreWithinThreshold(
    o1: NumericalObject,
    o2: NumericalObject
  ) {
  let k1 = Object.keys(o1).slice().sort();
  let k2 = Object.keys(o2).slice().sort();
  if (k1.length !== k2.length) {
    return false;
  }
  return k1.every(key => valuesAreWithinThreshold(o1[key], o2[key]));
}

export function toBeRoughly(received: number, argument: number) {
  const pass = valuesAreWithinThreshold(received, argument);
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
    interface Matchers<R> {
      toBeRoughly(a: number): R;
    }
  }
}

export function toBeTheSamePointAs(
    received: NumericalObject,
    argument: NumericalObject
  ) {
  const pass = objectValuesAreWithinThreshold(received, argument);
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
    interface Matchers<R> {
      toBeTheSamePointAs(a: NumericalObject): R;
    }
  }
}
