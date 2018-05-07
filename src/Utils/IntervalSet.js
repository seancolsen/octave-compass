import {musicTheory} from "../Data/musicTheory";
import Scalar from './Scalar';

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
    intervals.forEach(interval => {
      if (this.isActive(interval)) {
        result.push(interval);
      }
    });
    return result;
  }

  /**
   * Left-shift the bits of the binary intervals by the number of bits given,
   * and wrap the bit around the right side. This corresponds to rotating the
   * scale clockwise by the number of intervals given.
   *
   * @param {int} amount
   * @return {IntervalSet}
   */
  shift(amount) {
    const shift = Scalar.wrap(Math.round(amount), divisions);
    const shiftToWrap = divisions - shift;
    const allBits = (this.binary << shift) | (this.binary >> shiftToWrap);
    const mask = Math.pow(2, divisions) - 1;
    const result = allBits & mask;
    return new IntervalSet(result);
  }

  /**
   * Return a new IntervalSet with the given interval flipped from active to
   * inactive -- or from inactive to active -- as necessary.
   *
   * @param {int} interval
   * @return {IntervalSet}
   */
  toggleInterval(interval) {
    const result = this.binary ^ Math.pow(2, interval);
    return new IntervalSet(result);
  }

  /**
   * Search within our defined scales and chords to see if we have a name for
   * this set of intervals
   *
   * @return {string}
   */
  get name() {
    const t = musicTheory;
    const fallback = 'Unknown interval set';
    return t.scales[this.binary] || t.chords[this.binary] || fallback;
  }

  /**
   * Test whether the given interval is active within this interval set.
   *
   * @param {int} interval
   * @return {boolean}
   */
  isActive(interval) {
    return (this.binary & Math.pow(2, interval)) > 0;
  }

}
