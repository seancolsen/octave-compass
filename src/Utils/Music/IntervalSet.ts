import { musicTheory } from "./../../Data/musicTheory";
import { Scalar } from "./../Math/Scalar";
import { IntervalSetBinary } from "./IntervalSetBinary";

const divisions = musicTheory.octaveDivisions;

export type IntervalSetType = null | 'scale' | 'chord';

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
export class IntervalSet {

  /**
   * Possible names for this IntervalSet. We intentionally don't fill this array
   * in this class. The sub-classes are the ones which do that work.
   */
  names: string[] = [];

  /**
   * This property is set by child classes. Scales and chords have names,
   * sometimes multiple names. The defaultName represents the primary name
   * that we display.
   */
  defaultName: string | null = null;

  /**
   * The binary representation of this IntervalSet (as explained in IntervalSet
   * docs).
   */
  binary: number;

  /**
   * We use this to distinguish between Chord and Scale, which both inherit
   * from IntervalSet.
   */
  type = null as IntervalSetType;

  /**
   * This constructor takes a kind of funny format in order to be similar to the
   * constructors of Scale and Chord which inherit from this class.
   */
  constructor(intervalSetData: {'binary': number}) {
    this.binary = IntervalSetBinary.onlyChromatic(intervalSetData.binary);
  }

  /**
   * Return a new IntervalSet with the binary intervals as specified.
   */
  static fromBinary(binary: number) {
    return new IntervalSet({binary: binary});
  }

  /**
   * Return a new IntervalSet, given the ordinals for its intervals.
   *
   * @param ordinals - e.g. [0, 4, 7] for a major chord
   */
  static fromOrdinals(ordinals: number[]): IntervalSet {
    return IntervalSet.fromBinary(IntervalSetBinary.fromOrdinals(ordinals));
  }

  /**
   * Return an interval set containing all the intervals.
   */
  static get chromatic(): IntervalSet {
    return IntervalSet.fromBinary(IntervalSetBinary.chromatic);
  }

  static get chromaticOrdinals(): number[] {
    return [...Array(divisions).keys()];
  }

  /**
   * Return an array of interval ordinals present in this set.
   *
   * @return e.g [0, 4, 7] for a major chord
   */
  get ordinals(): number[] {
    return IntervalSetBinary.toOrdinals(this.binary);
  }

  /**
   * Test whether the given interval is active within this interval set.
   */
  isActive(interval: number): boolean {
    return IntervalSetBinary.containsOrdinal(this.binary, interval);
  }

  /**
   * Return true if the given set is a subset of this set.
   */
  contains(intervalSet: IntervalSet): boolean {
    return (this.binary & intervalSet.binary) === intervalSet.binary;
  }

  /**
   * Return true if all of the intervals in this set match all of the intervals
   * in the given set.
   */
  isIdenticalTo(intervalSet: IntervalSet): boolean {
    return this.binary === intervalSet.binary;
  }

  /**
   * Return a name for every scale. If we have a name for this interval set,
   * then use that. If the scale doesn't have a known name, then return
   * something like ('Scale 647') by using the base-10 integer equal to the
   * binary representation of the scale.
   */
  get displayName(): string {
    return this.defaultName || `Scale ${this.binary}`;
  }

  /**
   * Left-shift the bits of the binary intervals by the number of bits given,
   * and wrap the bit around the right side. This corresponds to rotating the
   * scale clockwise by the number of intervals given.
   */
  shift(shiftAmount: number): IntervalSet {
    const shift = Scalar.wrap(Math.round(shiftAmount), divisions);
    const shiftToWrap = divisions - shift;
    const allBits = (this.binary << shift) | (this.binary >> shiftToWrap);
    return IntervalSet.fromBinary(allBits);
  }

  /**
   * Shift this interval set to a different mode of itself.
   */
  modeShift(amount: number): IntervalSet {
    const ordinal = Scalar.wrap(amount, this.count);
    return this.shift(-this.ordinals[ordinal]);
  }

  /**
   * Return a new interval set with intervals toggled where the given binary
   * bits are true.
   */
  toggleBinaryIntervals(binary: number): IntervalSet {
    return IntervalSet.fromBinary(this.binary ^ binary);
  }

  /**
   * Return a new IntervalSet with one interval toggled, as specified by its
   * ordinal.
   */
  toggleIntervalOrdinal(ordinal: number): IntervalSet {
    return this.toggleBinaryIntervals(IntervalSetBinary.fromOrdinal(ordinal));
  }

  /**
   * Return a new interval set that contains all the intervals this set
   * doesn't contain.
   */
  get compliment(): IntervalSet {
    return this.toggleBinaryIntervals(IntervalSetBinary.chromatic);
  }

  /**
   * How many intervals in in this set?
   */
  get count(): number {
    return this.ordinals.length;
  }

  /**
   * Return an array of IntervalSets which are inversions of this IntervalSet.
   * By "inversion" here, we mean inversion in the sense of a chord. The first
   * inversion is produced by shifting this interval down just enough to place
   * its "1 ordinal" in the "0 ordinal" position.
   */
  get inversions(): IntervalSet[] {
    return this.ordinals.map(ordinal => this.shift(-ordinal));
  }

  /**
   * Compare this IntervalSet to the given IntervalSet. If this IntervalSet
   * can be shifted to become the given intervalSet, then return the minimum
   * number of (positive) shifts necessary. If there is no way that this
   * IntervalSet can be shifted to become the given intervalSet, then return
   * null.
   *
   * @return e.g.
   *   - 0 if this chord and the given chord are identical
   *   - 1 if this chord can become the given chord when inverted once
   *   - 2, 3, 4... and so on.
   *   - null if the two chords are not inversions of each other
   */
  inversionsToBeIdenticalTo(intervalSet: IntervalSet): number | null {
    // For performance, abandon early if we have a count mismatch.
    if (this.count !== intervalSet.count) {
      return null;
    }
    const i = this.inversions.findIndex(inv => inv.isIdenticalTo(intervalSet));
    return i >= 0 ? i : null;
  }

}