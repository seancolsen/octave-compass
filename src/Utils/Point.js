const PI = Math.PI;

/**
 * To make things easier in this app, we think of the objects existing within
 * a custom coordinate system, called the "constellation coordinate system". The
 * idea is similar to the polar coordinate system with a couple differences.
 *
 * The constellation coordinate system has the following two coordinates:
 *
 * - i -- to represent the musical interval
 * - r -- to represent the radius (like in polar)
 *
 * When i = 0, we are at the top most part of the coordinate system (in contrast
 * with polar which puts theta = 0 at the right most part of the coordinate
 * system).
 *
 * As i increases, we move clockwise (in contrast to polar, which moves counter-
 * clockwise).
 */
class Point {

  /**
   * The number of divisions (pie slices) within the octave. We set this to
   * 12 here since (for now) we're hard-coding this app to use twelve-tone
   * equal temperament.
   *
   * @type int
   */
  static DIVISIONS = 12;

  /**
   * Convert a "phi" coordinate `p` (as part of the standard polar coordinate
   * system) to an "interval" coordinate `i` (as part of our custom
   * constellation coordinate system).
   *
   * @param {number} p
   * @returns {number}
   */
  static p_i(p) {
    return this.wrap(this.DIVISIONS*(5/4 - p/(2*PI)), 12);
  }

  /**
   * Convert an "interval" coordinate `i` (as part of our custom constellation
   * coordinate system) to a "phi" coordinate (as part of the standard polar
   * coordinate system).
   *
   * @param {number} i
   * @returns {number}
   */
  static i_p(i) {
    return this.wrap((2 + 1/2)*PI - i*2*PI/this.DIVISIONS, 2*PI);
  }

  /**
   * Convert an array of constellation coordinates to an array of polar
   * coordinates.
   *
   * @param {[{number}, {number}]} ir
   * @returns {[{number}, {number}]}
   */
  static ir_pr(ir) {
    let [i, r] = ir;
    return [this.i_p(i), r];
  }

  /**
   * Convert an array of polar coordinates to an array of constellation
   * coordinates.
   *
   * @param {[{number}, {number}]} pr
   * @returns {[{number}, {number}]}
   */
  static pr_ir(pr) {
    let [p, r] = pr;
    return [this.p_i(p), r];
  }

  /**
   * Convert an array of polar coordinates to an array of cartesian coordinates
   *
   * @param {[{number}, {number}]}pr
   * @returns {[{number}, {number}]}
   */
  static pr_xy(pr) {
    let [p, r] = pr;
    return [r * Math.cos(p), r * Math.sin(p)];
  }

  /**
   * Convert an array of cartesian coordinates to an array of polar coordinates
   *
   * @param {[{number}, {number}]} xy
   * @returns {[{number}, {number}]}
   */
  static xy_pr(xy) {
    let [x, y] = xy;
    let p = this.wrap(Math.atan2(y, x), 2 * PI);
    let r = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
    return [p, r];
  }

  /**
   * Convert an array of cartesian coordinates to an array of constellation
   * coordinates.
   *
   * @param {[{number}, {number}]} xy
   * @returns {[{number}, {number}]}
   */
  static xy_ir(xy) {
    return this.pr_ir(this.xy_pr(xy));
  }

  /**
   * Convert an array of constellation coordinates to an array of cartesian
   * coordinates.
   *
   * @param {[{number}, {number}]} ir
   * @returns {[{number}, {number}]}
   */
  static ir_xy(ir) {
    return this.pr_xy(this.ir_pr(ir));
  }

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
    let shift = (value < 0) ? Math.ceil(Math.abs(value)/max)*max : 0;
    let positiveValue = value + shift;
    return positiveValue % max;
  }

}

export default Point;
