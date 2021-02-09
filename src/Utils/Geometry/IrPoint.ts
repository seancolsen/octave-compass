import type { Point } from './Point';
import { RCoordinate, PrPoint } from "./PrPoint";
import { Angle } from "./Angle";
import { CustomMath } from "../Math/CustomMath";
import type { XyPoint } from './XyPoint';

export type ICoordinate = number;
export type IrPointArray = [ICoordinate, RCoordinate];

/**
 * CONSTELLATION COORDINATE SYSTEM
 *
 * To make things easier in this app, we think of the objects existing within
 * a custom coordinate system, called the "constellation coordinate system". The
 * idea is similar to the polar coordinate system with a couple differences.
 *
 * The constellation coordinate system has the following two coordinates:
 *
 * - `i` - to represent the musical interval (0 - 11)
 * - `r` - to represent the radius (like in polar)
 *
 * When `i = 0`, we are at the top most part of the coordinate system (in
 * contrast with polar which puts `phi = 0` at the right most part of the
 * coordinate system).
 *
 * As `i` increases, we move clockwise (in contrast to polar, which moves 
 * counter-clockwise).
 */
export class IrPoint implements Point {

  constructor(
    public readonly i: ICoordinate,
    public readonly r: RCoordinate
  ) { }

  /**
   * Create a new IR point, given an array of I and R coordinates.
   */
  static fromArray(ir: IrPointArray): IrPoint {
    const [i, r] = ir;
    return new IrPoint(i, r);
  }

  roughlyEquals(irPoint: IrPoint): boolean {
    return CustomMath.valuesAreWithinThreshold(this.i, irPoint.i) && 
      CustomMath.valuesAreWithinThreshold(this.r, irPoint.r);
  }

  /**
   * Convert this point to a PR point.
   */
  toPr(): PrPoint {
    return new PrPoint(Angle.iToP(this.i), this.r);
  }

  /**
   * Convert this point to an XY point.
   */
  toXy(): XyPoint {
    return this.toPr().toXy();
  }

  /**
   * Vector addition
   */
  plus(irPoint: IrPoint): IrPoint {
    const i = irPoint.i || 0;
    const r = irPoint.r || 0;
    return new IrPoint(this.i + i, this.r + r);
  }

  /**
   * Increment the `i` value of this point.
   */
  plusI(i: number): IrPoint {
    return this.plus(new IrPoint(i, 0));
  }

  /**
   * Increment the `r` value of this point.
   */
  plusR(r: number): IrPoint {
    return this.plus(new IrPoint(0, r));
  }

}
