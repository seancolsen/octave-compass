const THRESHOLD = 0.00000000000001;

let valuesAreWithinThreshold = (v1, v2) => {
  let type1 = typeof(v1);
  let type2 = typeof(v2);
  if (type1 !== type2) {
    return false;
  }
  if (type1 === "string" && v1 !== v2) {
    return false;
  }
  return (Math.abs(v1 - v2) < THRESHOLD)
};

let objectValuesAreWithinThreshold = (o1, o2) => {
  let k1 = Object.keys(o1).slice().sort();
  let k2 = Object.keys(o2).slice().sort();
  if (k1.length !== k2.length) {
    return false;
  }
  return k1.every(key => valuesAreWithinThreshold(o1[key], o2[key]));
};

expect.extend({
  toBeRoughly(received, argument) {
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
  },
});

expect.extend({
  toBeTheSamePointAs(received, argument) {
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
});
