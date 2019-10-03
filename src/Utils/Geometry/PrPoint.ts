import { Point } from './Point';
import { IrPoint } from "./IrPoint";
import { Angle } from "./Angle";
import { XyPoint } from "./XyPoint";
import { CustomMath } from "../Math/CustomMath";

export type PCoordinate = number;
export type RCoordinate = number;
export type PrPointArray = [PCoordinate, RCoordinate];

/**
 * POLAR COORDINATE SYSTEM
 *
 * - `p` - the angle (aka "phi")
 * - `r` - the radius
 */
export class PrPoint extends Point {

  /**
   * Create a new point in PR space
   */
  constructor(public p: PCoordinate, public r: RCoordinate) {
    super();
  }

  /**
   * Create a new PR point, given an array of P and R coordinates.
   */
  static fromArray(pr: PrPointArray) {
    let [p, r] = pr;
    return new PrPoint(p, r);
  }

  roughlyEquals(prPoint: PrPoint) {
    return CustomMath.valuesAreWithinThreshold(this.p, prPoint.p) && 
      CustomMath.valuesAreWithinThreshold(this.r, prPoint.r);
  }

  /**
   * Convert this point to an IR point.
   */
  toIr() {
    return new IrPoint(Angle.pToI(this.p), this.r);
  }

  /**
   * Convert this point to an XY point
   */
  toXy() {
    let x = this.r * Math.cos(this.p);
    let y = this.r * Math.sin(this.p);
    y = -y; // Flip axis, for SVG
    return new XyPoint(x, y);
  }

  /**
   * Vector addition
   */
  plus(point: PrPoint) {
    return new PrPoint(this.p + point.p, this.r + point.r);
  }

  /**
   * Increment the `p` value of this point.
   */
  plusP(p: number) {
    return this.plus(new PrPoint(p, 0));
  }

  /**
   * Increment the `r` value of this point.
   */
  plusR(r: number) {
    return this.plus(new PrPoint(0, r));
  }

}