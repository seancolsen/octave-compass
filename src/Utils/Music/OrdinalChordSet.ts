import { ChordSet } from "./ChordSet";
import type { IntervalSet } from "./IntervalSet";
import type { Chord } from "./Chord";

/**
 * This represents a set of chords at a given interval within a scale.
 */
export class OrdinalChordSet {

  /**
   * The chords in this set.
   */
  chordSet: ChordSet;

  /**
   * The interval ordinal at which this chord set exists.
   */
  ordinal: number = 0;

  constructor(chordSet: ChordSet, ordinal: number) {
    this.chordSet = chordSet;
    this.ordinal = ordinal;
  }

  /**
   * Generate a new chord set which exists at the given ordinal within the
   * given interval set.
   */
  static fromOrdinalWithinIntervalSet(
    intervalSet: IntervalSet, ordinal: number, setOfPossibleChords: ChordSet
  ): OrdinalChordSet {
    let chords: Chord[] = [];
    setOfPossibleChords.chords.forEach(chord => {
      const shiftedChord = chord.intervalSet.shift(ordinal);
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
  static arrayFromIntervalSet(
    intervalSet: IntervalSet, setOfPossibleChords: ChordSet
  ): OrdinalChordSet[] {
    let result: OrdinalChordSet[] = [];
    intervalSet.ordinals.forEach(ordinal => {
      result.push(OrdinalChordSet.fromOrdinalWithinIntervalSet(
        intervalSet, ordinal, setOfPossibleChords
      ));
    });
    return result;
  }

}