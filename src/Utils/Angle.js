import {musicTheory} from '../Data/musicTheory.js';
import Scalar from "./Scalar";

const PI = Math.PI;
const CIRCLE_DEGREES = 360;

/**
 * This is a utility class to deal with the conversion of angles. Note that this
 * class deals with angles alone, in contrast to the Point class which deals
 * with angles as one of two coordinates needed to form a point. When we talk
 * about angles outside the context of points, we don't need to think about the
 * additional complexities of the coordinate system transformations. That's why
 * the functions here are simpler. They only deal with scaling. In contrast, the
 * functions `Point.iToP` and `Point.pToI` deal with scaling as well as shifting.
 */
export default class Angle {

  /**
   * Convert an interval angle to a degree angle.
   *
   * @param {number} i
   * @returns {number}
   */
  static iToD(i) {
    return CIRCLE_DEGREES * i / musicTheory.octaveDivisions;
  }

  /**
   * Convert a degree angle to an interval angle.
   *
   * @param {number} d
   * @returns {number}
   */
  static dToI(d) {
    return musicTheory.octaveDivisions * d / (CIRCLE_DEGREES);
  }

  /**
   * Convert a "phi" coordinate `p` (as part of the standard polar coordinate
   * system) in radians to an "interval" coordinate `i` (as part of our custom
   * constellation coordinate system).
   *
   * @param {number} p
   * @returns {number}
   */
  static pToI(p) {
    return Scalar.wrap(musicTheory.octaveDivisions * (5 / 4 - p / (2 * PI)), 12);
  }

  /**
   * Convert an "interval" coordinate `i` (as part of our custom constellation
   * coordinate system) to a "phi" coordinate `p` (as part of the standard polar
   * coordinate system) in radians.
   *
   * @param {number} i
   * @returns {number}
   */
  static iToP(i) {
    return Scalar.wrap((2 + 1 / 2) * PI - i * 2 * PI / musicTheory.octaveDivisions, 2 * PI);
  }

}
