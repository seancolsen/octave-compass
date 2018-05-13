import {musicTheory} from "../Data/musicTheory";
import Chord from "./Chord";
import IntervalSet from "./IntervalSet";
import Scale from "./Scale";
import Scalar from "./Scalar";
import ChordSet from "./ChordSet";

const divisions = musicTheory.octaveDivisions;

/**
 * This class exists to create IntervalSets of various types.
 *
 * I would have liked to put the logic here in the IntervalSet class instead,
 * but javascript wouldn't allow it, due to a circular import dependency.
 * Breaking it out into a separate class solved that issue, although I'm still
 * not sure if there's maybe a better way to set this up.
 */
export default class IntervalSetFactory {

  /**
   * @param {int} binary
   *
   * @return {IntervalSet}
   */
  static fromBinary(binary) {
    try {
      return new Chord(binary);
    }
    catch (e) {
    }
    try {
      return new Scale(binary);
    }
    catch (e) {
    }
    return new IntervalSet(binary);
  }

  /**
   * Left-shift the bits of the binary intervals by the number of bits given,
   * and wrap the bit around the right side. This corresponds to rotating the
   * scale clockwise by the number of intervals given.
   *
   * @param {IntervalSet} intervalSet
   * @param {int} shiftAmount
   * @return {IntervalSet}
   */
  static fromShift(intervalSet, shiftAmount) {
    const binary = intervalSet.binary;
    const shift = Scalar.wrap(Math.round(shiftAmount), divisions);
    const shiftToWrap = divisions - shift;
    const allBits = (binary << shift) | (binary >> shiftToWrap);
    const mask = IntervalSet.chromaticBinary;
    const result = allBits & mask;
    return new IntervalSet(result);
  }

  /**
   * Return a new Interval set
   *
   * @param {int[]} ordinals
   *   e.g. [0, 4, 7] for a major chord
   *
   * @return {IntervalSet}
   */
  static fromOrdinals(ordinals) {
    return IntervalSetFactory.fromBinary(
      IntervalSet.ordinalsToBinary(ordinals)
    );
  }

  /**
   * Return a new interval set with intervals toggled where the given binary
   * bits are true.
   *
   * @param {IntervalSet} intervalSet
   * @param {int} binary
   * @return {IntervalSet}
   */
  static fromToggledBinaryIntervals(intervalSet, binary) {
    return IntervalSetFactory.fromBinary(intervalSet.binary ^ binary);
  }

  /**
   * Return a new IntervalSet with the given interval flipped from active to
   * inactive -- or from inactive to active -- as necessary.
   *
   * @param {IntervalSet} intervalSet
   * @param {int} ordinal
   * @return {IntervalSet}
   */
  static fromToggledInterval(intervalSet, ordinal) {
    return IntervalSetFactory.fromToggledBinaryIntervals(
      intervalSet,
      IntervalSet.ordinalToBinary(ordinal)
    );
  }

  /**
   * Return a new interval set that contains all the intervals the given set
   * doesn't contain.
   *
   * @param {IntervalSet} intervalSet
   * @return {IntervalSet}
   */
  static fromCompliment(intervalSet) {
    return IntervalSetFactory.fromToggledBinaryIntervals(
      intervalSet,
      IntervalSet.chromaticBinary
    );
  }

  /**
   * For each of the given chords, return the chords that exist within the given
   * interval set. The return value is an object with interval ordinals as keys
   * and arrays of chords (which exist at those intervals) as values.
   *
   * @param {IntervalSet} intervalSet
   * @param {Chord[]} possibleChords
   *
   * @return {ChordSet[]}
   */
  static chordSets(intervalSet, possibleChords) {
    let result = [];
    intervalSet.ordinals.forEach(ordinal => {
      result.push(ChordSet.atOrdinal(intervalSet, ordinal, possibleChords));
    });
    return result;
  }

}
