import { Scalar } from "./../Math/Scalar";

/**
 * An ordinal is the integer representation of one interval, with "tonal center"
 * being 0 and "minor 2" being 1. This class provides helper functions for
 * dealing with ordinals.
 */
export class Ordinal {

  /**
   * Calculate the distance between two ordinals, taking into account the fact
   * that you can move clockwise or counterclockwise. The distance returned will
   * always be positive, and will be the minimum distance.
   */
  static distance(a: number, b: number): number {
    return Math.min(...[a - b, b - a].map(d => Scalar.wrapToOctave(d)));
  }

  /**
   * Return the value within validValues that is nearest to value.
   */
  static nearestValid(value: number, validValues: number[]): any {
    const distances = validValues.map(validValue =>
      Ordinal.distance(validValue, value)
    );
    const minDistance = Math.min(...distances);
    return validValues[distances.indexOf(minDistance)];
  }

}