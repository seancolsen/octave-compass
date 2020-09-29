interface inOut {in: number, out: number};

export class CustomMath {

  /**
   * Count the occurrences of each value in an array. Return an object with the
   * unique array values as object keys and the count of the array values as
   * the object values
   *
   * @param values - e.g. ['a', 'a', 'b', 'b', 'b', 'c']
   * @returns e.g. {a: 2, b: 3, c: 1}
   */
  static valueFrequency<T extends string | number>(values: T[]) {
    let result = {} as { [k in T]: number};
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

  /**
   * Test that two values are close to each other. This function exists because
   * of the errors inherent in floating point math. Sometimes we want to test to
   * make sure values are "equal" to each other, even if some error creeps in
   * from floating point math.
   */
  static valuesAreWithinThreshold(
    v1: number, 
    v2: number, 
    threshold: number = 0.00000000000001
  ): boolean {
    return (Math.abs(v1 - v2) < threshold);
  }

}