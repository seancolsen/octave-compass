import Scalar from "Utils/Math/Scalar";

/**
 * An ordinal is the integer representation of one interval, with "tonal center"
 * being 0 and "minor 2" being 1. This class provides helper functions for
 * dealing with ordinals.
 */
export default class Ordinal {

  /**
   * Calculate the distance between two ordinals, taking into account the fact
   * that you can move clockwise or counterclockwise. The distance returned will
   * always be positive, and will be the minimum distance.
   *
   * @param {number} a
   * @param {number} b
   * @return {number}
   */
  static distance(a, b) {
    return Math.min(...[a - b, b - a].map(d => Scalar.wrapToOctave(d)));
  }

  /**
   * Return the value within validValues that is nearest to value.
   *
   * @param {number} value
   * @param {number[]} validValues
   * @return {*}
   */
  static nearestValid(value, validValues) {
    const distances = validValues.map(validValue =>
      Ordinal.distance(validValue, value)
    );
    const minDistance = Math.min(...distances);
    return validValues[distances.indexOf(minDistance)];
  }

}