import type { Chord } from "./Chord";
import type { IntervalSet } from "./IntervalSet";

/**
 * Stores a chord at a specific ordinal.
 */
export class OrdinalChord {

  ordinal: number;

  chord: Chord;

  constructor(ordinal: number, chord: Chord) {
    this.ordinal = ordinal;
    this.chord = chord;
  }

  get intervalSet(): IntervalSet {
    return this.chord.intervalSet.shift(this.ordinal);
  }

}
