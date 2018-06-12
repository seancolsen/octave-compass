import {musicTheory} from "Data/musicTheory";
import IntervalSet from "Utils/Music/IntervalSet";

const divisions = musicTheory.octaveDivisions;

/**
 * Static functions to deal with integer numbers as binary representations of
 * IntervalSets
 */
export default class IntervalSetBinary {

  /**
   * Convert one interval ordinal to a binary representation of that interval.
   *
   * @param {int} ordinal
   * @return {int}
   */
  static fromOrdinal(ordinal) {
    return Math.pow(2, ordinal);
  }

  /**
   * Convert an array of interval ordinals to a binary representation of those
   * intervals.
   *
   * @param {int[]} ordinals
   * @return {int}
   */
  static fromOrdinals(ordinals) {
    return ordinals
      .map(IntervalSetBinary.fromOrdinal)
      .reduce((a, b) => a + b, 0);
  }

  /**
   * Convert a binary representation of intervals to an array of interval
   * ordinals.
   *
   * @param {int} binary
   * @return {int[]}
   */
  static toOrdinals(binary) {
    let result = [];
    IntervalSet.chromaticOrdinals.forEach(ordinal => {
      if (IntervalSetBinary.containsOrdinal(binary, ordinal)) {
        result.push(ordinal);
      }
    });
    return result;
  }

  /**
   * Return true if the given binary interval set contains the given ordinal.
   *
   * @param {int} binary
   * @param {int} ordinal
   * @return {boolean}
   */
  static containsOrdinal(binary, ordinal) {
    return (binary & IntervalSetBinary.fromOrdinal(ordinal)) > 0;
  }

  /**
   *
   * @return {int}
   */
  static get chromatic() {
    return Math.pow(2, divisions) - 1
  }

  /**
   * Apply a bit mask to a binary interval representation.
   *
   * @param binary
   * @param mask
   * @return {number}
   */
  static mask(binary, mask) {
    return binary & mask;
  }

  /**
   * Return a binary interval set with intervals eliminated that fall outside
   * the chromatic set.
   *
   * @param binary
   * @return {number}
   */
  static onlyChromatic(binary) {
    return IntervalSetBinary.mask(binary, IntervalSetBinary.chromatic);
  }

  /**
   * Return a binary interval set with the tonal center activated even if
   * it's inactive in the given set.
   *
   * @param {int} binary
   * @return {int}
   */
  static guaranteedToContainTonalCenter(binary) {
    return binary | 1;
  }


}