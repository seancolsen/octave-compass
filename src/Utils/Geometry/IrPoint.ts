import { Point } from './Point';
import { XyPoint } from "./XyPoint";
import { RCoordinate, PrPoint } from "./PrPoint";
import { Angle } from "./Angle";
import { CustomMath } from "../Math/CustomMath";

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
export class IrPoint extends Point {

  /**
   * Create a new point in IR space
   */
  constructor(public i: ICoordinate, public r: RCoordinate) {
    super();
  }

  /**
   * Create a new IR point, given an array of I and R coordinates.
   */
  static fromArray(ir: IrPointArray) {
    let [i, r] = ir;
    return new IrPoint(i, r);
  }

  roughlyEquals(irPoint: IrPoint) {
    return CustomMath.valuesAreWithinThreshold(this.i, irPoint.i) && 
      CustomMath.valuesAreWithinThreshold(this.r, irPoint.r);
  }

  /**
   * Convert an XY point in the page space to an IR point in the SVG space.
   *
   * @param svgDOMRect
   *
   * @param svgBoxSize
   *   The width of the SVG box within the SVG coordinate system. We assume the
   *   box is square and assume that the SVG origin is at the center of the SVG
   *   canvas (since that logic is hard-coded into this app and unlikely to
   *   change).
   *
   * @param cursor
   */
  static fromCursor(
      svgDOMRect: {x: number, y: number, width: number},
      svgBoxSize: number,
      cursor:  {x: number, y: number}
    ) {
    return (new XyPoint(cursor.x, cursor.y))
      .plus(new XyPoint(-svgDOMRect.x, -svgDOMRect.y))
      .times(svgBoxSize / svgDOMRect.width)
      .plus(new XyPoint(-svgBoxSize / 2, -svgBoxSize / 2))
      .toIr();
  }

  /**
   * Convert this point to a PR point.
   */
  toPr() {
    return new PrPoint(Angle.iToP(this.i), this.r);
  }

  /**
   * Convert this point to an XY point.
   */
  toXy() {
    return this.toPr().toXy();
  }

  /**
   * Vector addition
   */
  plus(irPoint: IrPoint) {
    let i = irPoint.i || 0;
    let r = irPoint.r || 0;
    return new IrPoint(this.i + i, this.r + r);
  }

}