/**
 * Stores a chord at a specific ordinal.
 */
export default class OrdinalChord {

  /**
   * @type {int}
   */
  ordinal;

  /**
   * @type {Chord}
   */
  chord;

  constructor(ordinal, chord) {
    this.ordinal = ordinal;
    this.chord = chord;
  }

  get intervalSet() {
    return this.chord.shift(this.ordinal);
  }

}
