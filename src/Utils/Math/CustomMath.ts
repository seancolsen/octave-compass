interface objectWithNumberValues { [k: string]: number};
interface inOut {in: number, out: number};

export default class CustomMath {

  /**
   * Count the occurrences of each value in an array. Return an object with the
   * unique array values as object keys and the count of the array values as
   * the object values
   *
   * @param values - e.g. ['a', 'a', 'b', 'b', 'b', 'c']
   * @returns e.g. {a: 2, b: 3, c: 1}
   */
  static valueFrequency(values: string[]): objectWithNumberValues {
    let result: objectWithNumberValues = {};
    values.forEach(v => {
      result[v] = (result[v] || 0) + 1
    });
    return result;
  }

  /**
   * Produce a combinatorial cartesian product
   */
  static cartesianProduct<T> (arr: T[][]): T[][] {
    return arr.reduce((a, b) => {
      return a.map(x => {
        return b.map(y => {
          return x.concat(y)
        })
      }).reduce((c, d) => c.concat(d), [])
    }, [[]] as T[][])
  }
  
  /**
   * Interpolate the value `x` according to a linear function that fits two
   * points given.
   */
  static linearInterpolate(x: number, p1: inOut, p2: inOut): number {
    return p1.out + (x - p1.in) * (p2.out - p1.out) / (p2.in - p1.in);
  }

}