import {musicTheory} from "../Data/musicTheory";

const divisions = musicTheory.octaveDivisions;

/**
 * We use binary numbers here to store sets of intervals. These binary numbers
 * are "big-endian".
 *
 * Examples:
 *
 * - An interval set of 0b000000000001 (aka 0b1) represents a set with only the
 *   tonal center (interval 0) being active.
 * - An interval set of 0b100000000000 represents a set with only the major
 *   seventh (interval 11) being active.
 * - An interval set of 0b000010010001 represents a set with: the tonal center
 *   (interval 0), a major third (interval 5), and a perfect fifth (interval 7).
 */
export default class IntervalSet {

  constructor(binary) {
    this.binary = binary;
  }

  /**
   *
   * @param {int} binary
   *
   * @return {IntervalSet}
   */
  static fromBinary(binary) {
    return new IntervalSet(binary);
  }

  /**
   * Return an array of intervals present in this set.
   *
   * @return {Array}
   *   e.g [0, 4, 7] for a major chord
   */
  toArray() {
    const intervals = [...Array(divisions).keys()];
    let result = [];
    intervals.forEach(i => {
      if ((this.binary & Math.pow(2, i)) > 0) {
        result.push(i);
      }
    });
    return result;
  }

}
