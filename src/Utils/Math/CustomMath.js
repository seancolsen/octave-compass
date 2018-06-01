export default class CustomMath {

  /**
   * Count the occurrences of each value in an array. Return an object with the
   * unique array values as object keys and the count of the array values as
   * the object values
   *
   * @param {[]} values
   *   e.g. ['a', 'a', 'b', 'b', 'b', 'c']
   * @return {{}}
   *   e.g. {a: 2, b: 3, c: 1}
   */
  static valueFrequency(values) {
    let result = {};
    values.forEach(v => {
      result[v] = (result[v] || 0) + 1
    });
    return result;
  }

  /**
   * Produce a combinatorial cartesian product
   *
   * @param {array} a
   * @param {array} b
   * @param {array} c
   * @return {*}
   */
  static cartesianProduct(a, b, ...c) {
    const f = (a, b) => [].concat(...a.map(d => b.map(e => [].concat(d, e))));
    return b ? CustomMath.cartesianProduct(f(a, b), ...c) : a;
  }

  /**
   * Interpolate the value `x` according to a linear function that fits two
   * points given.
   *
   * @param {number} x
   * @param {{in: number, out: number}} p1
   * @param {{in: number, out: number}} p2
   * @return {number}
   */
  static linearInterpolate(x, p1, p2) {
    return p1.out + (x - p1.in) * (p2.out - p1.out) / (p2.in - p1.in);
  }

}