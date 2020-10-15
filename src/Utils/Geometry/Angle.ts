import {musicTheory} from "./../../Data/musicTheory";
import {Scalar} from "./../Math/Scalar";

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
export class Angle {

  /**
   * Convert an interval angle to a degree angle.
   */
  static iToD(i: number): number {
    return CIRCLE_DEGREES * i / musicTheory.octaveDivisions;
  }

  /**
   * Convert a degree angle to an interval angle.
   */
  static dToI(d: number): number {
    return musicTheory.octaveDivisions * d / (CIRCLE_DEGREES);
  }

  /**
   * Convert a "phi" coordinate `p` (as part of the standard polar coordinate
   * system) in radians to an "interval" coordinate `i` (as part of our custom
   * constellation coordinate system).
   */
  static pToI(p: number): number {
    const o = musicTheory.octaveDivisions;
    return Scalar.wrap(o * (5 / 4 - p / (2 * PI)), o);
  }

  /**
   * Convert an "interval" coordinate `i` (as part of our custom constellation
   * coordinate system) to a "phi" coordinate `p` (as part of the standard polar
   * coordinate system) in radians.
   */
  static iToP(i: number): number {
    return Scalar.wrap(
      (2 + 1 / 2) * PI - i * 2 * PI / musicTheory.octaveDivisions,
      2 * PI
    );
  }

  /**
   * Calculate the minimum distance between two angles. Move clockwise or
   * counterclockwise. The distance returned will always be positive.
   *
   * @param a One angle
   * @param b Another angle
   * @param circleUnit Used to specify the units of both angles.
   *  - Pass `2 * PI` here if both angles are in radians.
   *  - Pass `1` here if both angles are in revolutions.
   *  - Pass the number of octave divisions (e.g. 12) if both angles are in
   *    "interval" units.
   */
  static betweenAngles(a: number, b: number, circleUnit: number): number {
    return Math.min( ...[a - b, b - a].map(d => Scalar.wrap(d, circleUnit)) );
  }

  /**
   * Return the value within choices that is nearest to angle. If multiple
   * choices tie for nearest, return the first listed one.
   *
   * @param angle
   * @param choices An array of possible angles.
   * @param circleUnit Used to specify the units of both angles.
   *  - Pass `2 * PI` here if both angles are in radians.
   *  - Pass `1` here if both angles are in revolutions.
   *  - Pass the number of octave divisions (e.g. 12) if both angles are in
   *    "interval" units.
   */
  static nearest(
    angle: number,
    choices: number[],
    circleUnit: number
  ): any {
    const distances = choices.map(choice =>
      Angle.betweenAngles(choice, angle, circleUnit)
    );
    const minDistance = Math.min(...distances);
    return choices[distances.indexOf(minDistance)];
  }

}