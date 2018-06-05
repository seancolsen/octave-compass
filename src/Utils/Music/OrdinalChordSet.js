import ChordSet from "Utils/Music/ChordSet";

/**
 * This represents a set of chords at a given interval within a scale.
 */
export default class OrdinalChordSet {

  /**
   * The chords in this set.
   *
   * @type {ChordSet}
   */
  chordSet;

  /**
   * The interval ordinal at which this chord set exists.
   *
   * @type {number}
   */
  ordinal = 0;

  constructor(chordSet, ordinal) {
    this.chordSet = chordSet;
    this.ordinal = ordinal;
  }

  /**
   * Generate a new chord set which exists at the given ordinal within the
   * given interval set.
   *
   * @param {IntervalSet} intervalSet
   * @param {int} ordinal
   * @param {ChordSet} setOfPossibleChords
   * @return {OrdinalChordSet}
   */
  static fromOrdinalWithinIntervalSet(
    intervalSet, ordinal, setOfPossibleChords
  ) {
    let chords = [];
    setOfPossibleChords.chords.forEach(chord => {
      const shiftedChord = chord.shift(ordinal);
      if (intervalSet.contains(shiftedChord)) {
        chords.push(chord);
      }
    });
    const chordSet = new ChordSet(chords);
    return new OrdinalChordSet(chordSet, ordinal);
  }

  /**
   * Return an array of OrdinalChordSets. Each element in the array holds the
   * chords that exist at one ordinal of the given IntervalSet.
   *
   * @param {IntervalSet} intervalSet
   * @param {ChordSet} setOfPossibleChords
   * @return {OrdinalChordSet[]}
   */
  static arrayFromIntervalSet(intervalSet, setOfPossibleChords) {
    let result = [];
    intervalSet.ordinals.forEach(ordinal => {
      result.push(OrdinalChordSet.fromOrdinalWithinIntervalSet(
        intervalSet, ordinal, setOfPossibleChords
      ));
    });
    return result;
  }

}