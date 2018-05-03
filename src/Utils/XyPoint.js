import Scalar from "./Scalar";
import PrPoint from "./PrPoint.js";

const PI = Math.PI;

/**
 * CARTESIAN COORDINATE SYSTEM
 *
 * Our cartesian coordinate system within this app considers the positive y
 * axis to be pointing down. We do this to match the way that SVG works.
 *
 */
export default class XyPoint {

  /**
   * Create a new point in XY space.
   *
   * @param {number} x
   * @param {number} y
   */
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  /**
   * Create a new XY point, given an array of X and Y coordinates.
   *
   * @param {[number, number]} xy
   * @returns {XyPoint}
   */
  static fromArray(xy) {
    let [x, y] = xy;
    return new XyPoint(x, y);
  }

  /**
   * Convert this point to a PR point.
   *
   * @returns {PrPoint}
   */
  toPr() {
    let x = this.x;
    let y = -this.y; // Flip axis, for SVG
    let p = Scalar.wrap(Math.atan2(y, x), 2 * PI);
    let r = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
    return new PrPoint(p, r);
  }

  /**
   * Convert this point to an IR point.
   *
   * @returns {IrPoint}
   */
  toIr() {
    return this.toPr().toIr();
  }

  /**
   * Convert this point to a string representation, with X and Y separated by
   * one comma.
   *
   * @return {string}
   */
  toString() {
    return `${this.x},${this.y}`;
  }

  /**
   * Convert an array of IR points to a string of XY points. This string can
   * then be fed directly into an SVG attribute.
   *
   * @param {[IrPoint]} irPoints
   * @return {string}
   */
  static stringFromIrArray(irPoints) {
    let xyPoints = irPoints.map((irPoint) => irPoint.toXy());
    return xyPoints.map((point) => point.toString()).join(' ');
  }

}
