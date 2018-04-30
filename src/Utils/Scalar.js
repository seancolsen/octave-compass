/**
 * Helper functions to deal with plain scalar numbers
 */
export default class Scalar {

  /**
   * Ensure that `value` is within range between 0 and `max`. If `value` is
   * negative, then it's shifted up enough to make it positive. If `values` is
   * greater than `max`, then it's shifted down to make it in-range.
   *
   * @param {number} value
   * @param {number} max
   * @returns {number}
   */
  static wrap(value, max) {
    let shift = (value < 0) ? Math.ceil(Math.abs(value) / max) * max : 0;
    let positiveValue = value + shift;
    return positiveValue % max;
  }

}
