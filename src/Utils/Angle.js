import {musicTheory} from '../Data/musicTheory.js';

const CIRCLE_DEGREES = 360;

/**
 * This is a utility class to deal with the conversion of angles. Note that this
 * class deals with angles alone, in contrast to the Point class which deals
 * with angles as one of two coordinates needed to form a point. When we talk
 * about angles outside the context of points, we don't need to think about the
 * additional complexities of the coordinate system transformations. That's why
 * the functions here are simpler. They only deal with scaling. In contrast, the
 * functions `Point.i_p` and `Point.p_i` deal with scaling as well as shifting.
 */
export default class Angle {

  /**
   * Convert an interval angle to a degree angle.
   *
   * @param {number} i
   * @returns {number}
   */
  static i_d(i) {
    return CIRCLE_DEGREES * i / musicTheory.octaveDivisions;
  }

  /**
   * Convert a degree angle to an interval angle.
   *
   * @param {number} d
   * @returns {number}
   */
  static d_i(d) {
    return musicTheory.octaveDivisions * d / (CIRCLE_DEGREES);
  }

}
