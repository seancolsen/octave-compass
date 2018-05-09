export default class Statistics {

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
    values.forEach(v => {result[v] = (result[v] || 0) + 1});
    return result;
  }

}
