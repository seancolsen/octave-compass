import { Scalar } from "./../Math/Scalar";
import { PrPoint } from "./PrPoint";
import type { IrPoint } from "./IrPoint";
import type { Point } from './Point';
import { CustomMath } from "../Math/CustomMath";
import { musicTheory } from "../../Data/musicTheory";

const PI = Math.PI;

export type XCoordinate = number;
export type YCoordinate = number;
export type XyPointArray = [XCoordinate, YCoordinate];

/**
 * CARTESIAN COORDINATE SYSTEM
 *
 * Our cartesian coordinate system within this app considers the positive y
 * axis to be pointing down. We do this to match the way that SVG works.
 */
export class XyPoint implements Point {

  constructor(
    public readonly x: XCoordinate,
    public readonly y: YCoordinate
  ) { }

  roughlyEquals(xyPoint: XyPoint): boolean {
    return CustomMath.valuesAreWithinThreshold(this.x, xyPoint.x) && 
      CustomMath.valuesAreWithinThreshold(this.y, xyPoint.y);
  }

  /**
   * Create a new XY point, given an array of X and Y coordinates.
   */
  static fromArray(xy: XyPointArray): XyPoint {
    const [x, y] = xy;
    return new XyPoint(x, y);
  }

  /**
   * Convert this point to a PR point.
   */
  toPr(): PrPoint {
    const x = this.x;
    const y = -this.y; // Flip axis, for SVG
    const p = Scalar.wrap(Math.atan2(y, x), 2 * PI);
    const r = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
    return new PrPoint(p, r);
  }

  /**
   * Convert this point to an IR point.
   */
  toIr(): IrPoint {
    return this.toPr().toIr();
  }

  /**
   * Convert this point to an IR point and return only the "I" value.
   */
  toI(): number {
    const x = this.x;
    const y = -this.y; // Flip axis, for SVG
    const o = musicTheory.octaveDivisions;
    return Scalar.wrap(o * (5 / 4 - Math.atan2(y, x) / (2 * PI)), o)
  }

  /**
   * Convert this point to a string representation, with X and Y separated by
   * one comma.
   */
  toString(): string {
    return `${this.x},${this.y}`;
  }

  /**
   * Convert an array of IR points to a string of XY points. This string can
   * then be fed directly into an SVG attribute.
   */
  static stringFromIrArray(irPoints: IrPoint[]): string {
    const xyPoints = irPoints.map((irPoint) => irPoint.toXy());
    return xyPoints.map((point) => point.toString()).join(' ');
  }

  /**
   * Vector addition.
   */
  plus(xyPoint: XyPoint): XyPoint {
    const x = xyPoint.x || 0;
    const y = xyPoint.y || 0;
    return new XyPoint(this.x + x, this.y + y);
  }

  /**
   * Flip around the origin. Equivalent to multiply by -1.
   */
  invert(): XyPoint {
    return new XyPoint(-this.x, -this.y);
  }

  /**
   * Vector subtraction.
   */
  minus(xyPoint: XyPoint): XyPoint {
    return this.plus(xyPoint.invert());
  }

  /**
   * Increment the `x` value of this point.
   */
  plusX(x: number): XyPoint {
    return this.plus(new XyPoint(x, 0));
  }

  /**
   * Increment the `y` value of this point.
   */
  plusY(y: number): XyPoint {
    return this.plus(new XyPoint(0, y));
  }

  /**
   * Multiply both coordinates of this point by a scalar number.
   */
  times(factor: number): XyPoint {
    return new XyPoint(this.x * factor, this.y * factor);
  }

}
