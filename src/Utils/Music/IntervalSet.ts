import { musicTheory } from "./../../Data/musicTheory";
import { Scalar } from "./../Math/Scalar";
import { Chord } from "./Chord";
import { Interval } from "./Interval";
import { IntervalSetBinary } from "./IntervalSetBinary";
import { IntervalSetName } from "./IntervalSetName";
import { InvertedChord } from "./InvertedChord";
import { NoteSet } from "./NoteSet";
import { Scale } from "./Scale";

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
export class IntervalSet {

  /**
   * The binary representation of this IntervalSet (as explained in IntervalSet
   * docs).
   */
  binary: number;

  /**
   * The named Scale associated with this IntervalSet.
   */
  scale = undefined as Scale | undefined;

  /**
   * The chords that this IntervalSet represents. NOT the chords "within" this
   * IntervalSet, but the chords that this IntervalSet "is". It's a list and
   * not just one value because some chords are inversions of each other, e.g.
   * sus2 & sus4.
   */
  invertedChords = undefined as InvertedChord[] | undefined;

  /**
   * True when analysis has been performed to locate named scales and chords
   * associated with this IntervalSet. False when we haven't gone through the
   * trouble yet.
   */
  isAnalyzed = false;

  /**
   * @param binary The binary representation of the IntervalSet
   * @param shouldAnalyze When true, attempt to identify named scales and chords
   * for this IntervalSet. We don't do this by default because it's expensive.
   */
  constructor(binary: number, shouldAnalyze = false) {
    this.binary = IntervalSetBinary.onlyChromatic(binary);
    if (shouldAnalyze) {
      this.initScale();
      this.initInvertedChords();
      this.isAnalyzed = true;
    }
  }

  private initScale() {
    try {
      this.scale = Scale.fromBinary(this.binary);
    }
    catch {
      this.scale = undefined;
    }
  }
  
  private initInvertedChords() {
    let result = [] as InvertedChord[];
    this.modes.forEach((intervalSet, modeShift) => {
      try {
        const chord = Chord.fromBinary(intervalSet.binary);
        const inversion = Scalar.wrap(-modeShift, this.count);
        result.push(new InvertedChord(chord, inversion));
      }
      catch { }
    });
    this.invertedChords = result;
  }
  
  static fromBinary(binary: number) {
    return new IntervalSet(binary);
  }

  /**
   * Return an IntervalSet equal to this one, but with the scale and chord info
   * filled in. We don't do this in the constructor because it's somewhat
   * expensive.
   */
  get analyzed() {
    if (this.isAnalyzed) {
      return this;
    }
    return new IntervalSet(this.binary, true);
  }

  /**
   * Return a new IntervalSet, given the ordinals for its intervals.
   *
   * @param ordinals - e.g. [0, 4, 7] for a major chord
   */
  static fromOrdinals(ordinals: number[]): IntervalSet {
    return new IntervalSet(IntervalSetBinary.fromOrdinals(ordinals));
  }

  /**
   * Return an interval set containing all the intervals.
   */
  static get chromatic(): IntervalSet {
    return new IntervalSet(IntervalSetBinary.chromatic);
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
   * Return an array of Interval objects representing the intervals contained
   * within this set.
   */
  get intervals(): Interval[] {
    return this.ordinals.map(o => new Interval(o));
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
   * Return true if the given set can be a subset of this set if the two sets
   * are properly shifted with respect to one another.
   */
  canContain(intervalSet: IntervalSet): boolean {
    if (intervalSet.count > this.count) {
      return false;
    }
    const sub = intervalSet.shiftedToHaveTonalCenter;
    return this.modes.some(is => is.contains(sub));
  }

  /**
   * If this set doesn't have a tonal center, return a new set that does by
   * shifting this one.
   */
  get shiftedToHaveTonalCenter() {
    return this.shift(this.ordinals[0]);
  }

  /**
   * Return true if this set has a tonal center. False if not.
   */
  get hasTonalCenter() {
    return this.contains(new IntervalSet(1));
  }

  /**
   * Return true if all of the intervals in this set match all of the intervals
   * in the given set.
   */
  isIdenticalTo(intervalSet: IntervalSet): boolean {
    return this.binary === intervalSet.binary;
  }

  /**
   * True if this IntervalSet represents a Scale. Undefined if analysis hasn't
   * yet been performed. Note that an IntervalSet can be a Scale and a Chord at
   * the same time (in rare cases).
   */
  get isScale() {
    if (!this.isAnalyzed) {
      return undefined;
    }
    return !!this.scale;
  }

  /**
   * True if this IntervalSet represents a Chord. Undefined if analysis hasn't
   * yet been performed. Note that an IntervalSet can be a Scale and a Chord at
   * the same time (in rare cases).
   */
  get isChord() {
    if (!this.isAnalyzed) {
      return undefined;
    }
    return (this.invertedChords?.length ?? 0) > 0;
  }

  get isNamed() {
    return this.isScale || this.isChord;
  }

  /**
   * If this IntervalSet represents a chord, return the InvertedChord that
   * contains that Chord. If this IntervalSet represents multiple chords of
   * different inversions (uncommon, but for example, sus2 and sus4), then we
   * use some complex logic to pick the best one.
   */
  get invertedChord() {
    // If we don't have chords, then give up early.
    const invertedChords = this.invertedChords;
    if (!invertedChords || invertedChords.length === 0) {
      return undefined;
    }

    // If we have a chord at the tonal center, then use that one.
    const plainChord = invertedChords.find(ic => ic.inversion === 0);
    if (plainChord) {
      return plainChord;
    }

    // Otherwise, use the chord with the minimum weight.
    const minWeight = Math.min(...invertedChords.map(ic => ic.chord.weight));
    const bestIChord = invertedChords.find(ic => ic.chord.weight === minWeight);
    return bestIChord;
  }

  get chordName(): IntervalSetName | undefined {
    return this.invertedChord?.intervalSetName;
  }

  get scaleName(): IntervalSetName | undefined {
    return this.scale?.intervalSetName;
  }

  get name(): IntervalSetName {
    return this.chordName
      ?? this.scaleName
      ?? new IntervalSetName({binary: this.binary});
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
    return new IntervalSet(allBits);
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
    return new IntervalSet(this.binary ^ binary);
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
   * Return an array of IntervalSets which are modes of this IntervalSet.
   */
  get modes(): IntervalSet[] {
    return this.ordinals.map(ordinal => this.shift(-ordinal));
  }

  /**
   * Compare this IntervalSet to the given IntervalSet. If this IntervalSet can
   * be shifted to become the given intervalSet, then return the minimum number
   * of (positive) shifts necessary. If there is no way that this IntervalSet
   * can be shifted to become the given intervalSet, then return null.
   *
   * @return e.g.
   *   - 0 if this IntervalSet and the given IntervalSet are identical.
   *   - 1 if this IntervalSet can become the given IntervalSet with one mode
   *     shift.
   *   - 2, 3, 4... and so on.
   *   - null if the two IntervalSets are not modes of each other.
   */
  modeShiftsToBeIdenticalTo(intervalSet: IntervalSet): number | null {
    // For performance, abandon early if we have a count mismatch.
    if (this.count !== intervalSet.count) {
      return null;
    }
    const i = this.modes.findIndex(inv => inv.isIdenticalTo(intervalSet));
    return i >= 0 ? i : null;
  }

  get noteNameSetSignatures() {
    /**
     * Only calculate signatures for 6, 7, and 8 note scales. Naming larger sets
     * gets pretty ugly, with lots of double sharps and double flats. Naming
     * smaller sets isn't so useful because they usually look pretty decent just
     * named as flats, and we don't want to store that much data in the cache
     * file that the client has to download.
     */
    if (this.count < 6 || this.count > 8) {return undefined;}

    const tonalCenters = [...Array(musicTheory.octaveDivisions).keys()];
    const noteSets = tonalCenters.map(tc => 
      NoteSet.fromIntervalSetAndTonalCenter(this, tc).namedViaBruteForce
    );
    return noteSets.map(noteSet => noteSet.nameSetSignature);
  }

}
