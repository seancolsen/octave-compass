import { Scalar } from "./../Math/Scalar";
import { PrPoint } from "./PrPoint";
import type { IrPoint } from "./IrPoint";
import { Point } from './Point';
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
export class XyPoint extends Point {

  /**
   * Create a new point in XY space.
   */
  constructor(public x: XCoordinate, public y: YCoordinate) {
    super();
  }

  roughlyEquals(xyPoint: XyPoint) {
    return CustomMath.valuesAreWithinThreshold(this.x, xyPoint.x) && 
      CustomMath.valuesAreWithinThreshold(this.y, xyPoint.y);
  }

  /**
   * Create a new XY point, given an array of X and Y coordinates.
   */
  static fromArray(xy: XyPointArray) {
    let [x, y] = xy;
    return new XyPoint(x, y);
  }

  /**
   * Convert this point to a PR point.
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
   */
  toIr() {
    return this.toPr().toIr();
  }

  /**
   * Convert this point to an IR point and return only the "I" value.
   */
  toI() {
    let x = this.x;
    let y = -this.y; // Flip axis, for SVG
    let o = musicTheory.octaveDivisions;
    return Scalar.wrap(o * (5 / 4 - Math.atan2(y, x) / (2 * PI)), o)
  }

  /**
   * Convert this point to a string representation, with X and Y separated by
   * one comma.
   */
  toString() {
    return `${this.x},${this.y}`;
  }

  /**
   * Convert an array of IR points to a string of XY points. This string can
   * then be fed directly into an SVG attribute.
   */
  static stringFromIrArray(irPoints: IrPoint[]) {
    let xyPoints = irPoints.map((irPoint) => irPoint.toXy());
    return xyPoints.map((point) => point.toString()).join(' ');
  }

  /**
   * Vector addition.
   */
  plus(xyPoint: XyPoint) {
    let x = xyPoint.x || 0;
    let y = xyPoint.y || 0;
    return new XyPoint(this.x + x, this.y + y);
  }

  /**
   * Flip around the origin. Equivalent to multiply by -1.
   */
  invert() {
    return new XyPoint(-this.x, -this.y);
  }

  /**
   * Vector subtraction.
   */
  minus(xyPoint: XyPoint) {
    return this.plus(xyPoint.invert());
  }

  /**
   * Increment the `x` value of this point.
   */
  plusX(x: number) {
    return this.plus(new XyPoint(x, 0));
  }

  /**
   * Increment the `y` value of this point.
   */
  plusY(y: number) {
    return this.plus(new XyPoint(0, y));
  }

  /**
   * Multiply both coordinates of this point by a scalar number.
   */
  times(factor: number) {
    return new XyPoint(this.x * factor, this.y * factor);
  }

}