import {musicTheory} from "Data/musicTheory";

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

  /**
   * Possible names for this IntervalSet. We intentionally don't fill this array
   * in this class. The sub-classes are the ones which do that work.
   *
   * @type {string[]}
   */
  names = [];

  /**
   * This property is set by child classes. Scales and chords have names,
   * sometimes multiple names. The defaultName represents the primary name
   * that we display.
   *
   * @type {string|null}
   */
  defaultName = null;

  /**
   * @param {number} binary
   */
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
   * @return {boolean}
   */
  static binaryContainsOrdinal(binary, ordinal) {
    return (binary & IntervalSet.ordinalToBinary(ordinal)) > 0;
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
   * Return an array of interval ordinals present in this set.
   *
   * @return {int[]}
   *   e.g [0, 4, 7] for a major chord
   */
  get ordinals() {
    return IntervalSet.binaryToOrdinals(this.binary);
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
   * Return true if the given set is a subset of this set.
   *
   * @param {IntervalSet} intervalSet
   * @return {boolean}
   */
  contains(intervalSet) {
    return (this.binary & intervalSet.binary) === intervalSet.binary;
  }

  /**
   *
   * @return {*|string}
   */
  get displayName() {
    return this.defaultName || 'Scale ' + parseInt(this.binary, 10);
  }

}
