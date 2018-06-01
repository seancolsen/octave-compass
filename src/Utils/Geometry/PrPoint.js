import IrPoint from "Utils/Geometry/IrPoint";
import Angle from "Utils/Geometry/Angle";
import XyPoint from "Utils/Geometry/XyPoint";

/**
 * POLAR COORDINATE SYSTEM
 *
 * p - the angle (aka "phi")
 * r - the radius
 */
export default class PrPoint {

  /**
   * Create a new point in PR space
   *
   * @param {number} p
   * @param {number} r
   */
  constructor(p, r) {
    this.p = p;
    this.r = r;
  }

  /**
   * Create a new PR point, given an array of P and R coordinates.
   *
   * @param {[number, number]} pr
   * @returns {PrPoint}
   */
  static fromArray(pr) {
    let [p, r] = pr;
    return new PrPoint(p, r);
  }

  /**
   * Convert this point to an IR point.
   *
   * @returns {IrPoint}
   */
  toIr() {
    return new IrPoint(Angle.pToI(this.p), this.r);
  }

  /**
   * Convert this point to an XY point
   *
   * @returns {XyPoint}
   */
  toXy() {
    let x = this.r * Math.cos(this.p);
    let y = this.r * Math.sin(this.p);
    y = -y; // Flip axis, for SVG
    return new XyPoint(x, y);
  }

}