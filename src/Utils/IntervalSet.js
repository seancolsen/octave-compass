import {musicTheory} from "../Data/musicTheory";
import Scalar from './Scalar';

const divisions = musicTheory.octaveDivisions;

/**
 * This class stores a set of intervals using a binary representation of that
 * set. Functions also exist here to deal with an "ordinals" representation of
 * the same set.
 *
 * ORDINALS
 *
 * e.g. Major scale: [0, 2, 4, 5, 7, 9, 11]
 *
 * One "ordinal" is an integer representing the number of semitones in the
 * interval. An array of ordinals can represent an interval set.
 *
 * BINARY
 *
 * e.g. Major scale: 0b101010110101
 *
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
 *
 */
export default class IntervalSet {

  constructor(binary) {
    this.binary = binary;
  }

  /**
   * Convert one interval ordinal to a binary representation of that interval.
   *
   * @param {int} ordinal
   * @return {int}
   */
  static ordinalToBinary(ordinal) {
    return Math.pow(2, ordinal);
  }

  /**
   * Convert an array of interval ordinals to a binary representation of those
   * intervals.
   *
   * @param {int[]} ordinals
   * @return {int}
   */
  static ordinalsToBinary(ordinals) {
    return ordinals.map(IntervalSet.ordinalToBinary).reduce((a, b) => a + b, 0);
  }

  /**
   * Convert a binary representation of intervals to an array of interval
   * ordinals.
   *
   * @param {int} binary
   * @return {int[]}
   */
  static binaryToOrdinals(binary) {
    let result = [];
    IntervalSet.chromaticOrdinals.forEach(ordinal => {
      if (IntervalSet.binaryContainsOrdinal(binary, ordinal)) {
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
   */
  static binaryContainsOrdinal(binary, ordinal) {
    return (binary & IntervalSet.ordinalToBinary(ordinal)) > 0;
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
   * Return a new Interval set
   *
   * @param {int[]} array
   *   e.g. [0, 4, 7] for a major chord
   *
   * @return {IntervalSet}
   */
  static fromArray(array) {
    return IntervalSet.fromBinary(IntervalSet.ordinalsToBinary(array));
  }

  /**
   *
   * @return {int}
   */
  static get chromaticBinary() {
    return Math.pow(2, divisions) - 1
  }

  /**
   *
   * @return {int[]}
   */
  static get chromaticOrdinals() {
    return [...Array(divisions).keys()];
  }

  /**
   * Return an array of intervals present in this set.
   *
   * @return {Array}
   *   e.g [0, 4, 7] for a major chord
   */
  toArray() {
    return IntervalSet.binaryToOrdinals(this.binary);
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
    const mask = IntervalSet.chromaticBinary;
    const result = allBits & mask;
    return new IntervalSet(result);
  }

  /**
   * Return a new interval set with intervals toggled where the given binary
   * bits are true.
   *
   * @return {IntervalSet}
   */
  toggleBinaryIntervals(binary) {
    return new IntervalSet(this.binary ^ binary);
  }

  /**
   * Return a new IntervalSet with the given interval flipped from active to
   * inactive -- or from inactive to active -- as necessary.
   *
   * @param {int} ordinal
   * @return {IntervalSet}
   */
  toggleInterval(ordinal) {
    return this.toggleBinaryIntervals(IntervalSet.ordinalToBinary(ordinal));
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
    return IntervalSet.binaryContainsOrdinal(this.binary, interval);
  }

  /**
   * Return a new interval set that contains all the intervals this set doesn't
   * contain.
   *
   * @return {IntervalSet}
   */
  get compliment() {
    return this.toggleBinaryIntervals(IntervalSet.chromaticBinary);
  }

}