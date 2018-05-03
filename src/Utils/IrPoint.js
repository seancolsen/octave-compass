import Angle from './Angle.js';
import PrPoint from './PrPoint.js';

/**
 * CONSTELLATION COORDINATE SYSTEM
 *
 * To make things easier in this app, we think of the objects existing within
 * a custom coordinate system, called the "constellation coordinate system". The
 * idea is similar to the polar coordinate system with a couple differences.
 *
 * The constellation coordinate system has the following two coordinates:
 *
 * - i -- to represent the musical interval (0 - 11)
 * - r -- to represent the radius (like in polar)
 *
 * When i = 0, we are at the top most part of the coordinate system (in contrast
 * with polar which puts theta = 0 at the right most part of the coordinate
 * system).
 *
 * As i increases, we move clockwise (in contrast to polar, which moves counter-
 * clockwise).
 */
export default class IrPoint {

  /**
   * Create a new point in IR space
   *
   * @param {number} i
   * @param {number} r
   */
  constructor(i, r) {
    this.i = i;
    this.r = r;
  }

  /**
   * Create a new IR point, given an array of I and R coordinates.
   *
   * @param {[number, number]} ir
   * @returns {IrPoint}
   */
  static fromArray(ir) {
    let [i, r] = ir;
    return new IrPoint(i, r);
  }

  /**
   * Convert an XY point in the page space to an IR point in the SVG space.
   *
   * @param {DOMRect} svgDOMRect
   * @param {XyPoint} svgOrigin
   * @param {XyPoint} cursor
   * @returns {IrPoint}
   */
  static fromCursor(svgDOMRect, svgOrigin, cursor) {
    return 0; // TODO
  }

  /**
   * Convert this point to a PR point.
   *
   * @returns {PrPoint}
   */
  toPr() {
    return new PrPoint(Angle.iToP(this.i), this.r);
  }

  /**
   * Convert this point to an XY point.
   *
   * @returns {XyPoint}
   */
  toXy(ir) {
    return this.toPr().toXy();
  }

  /**
   *
   * @param {object} irPoint
   */
  plus(irPoint) {
    let i = irPoint.i || 0;
    let r = irPoint.r || 0;
    return new IrPoint(this.i + i, this.r + r);
  }

}
