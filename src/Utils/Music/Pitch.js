import {musicTheory} from "Data/musicTheory";

export default class Pitch {

  /**
   * @type {Note}
   */
  note;

  /**
   * The octave number in scientific pitch notation.
   *
   * @type {int}
   */
  octave;

  constructor(note, octave) {
    this.note = note;
    this.octave = octave;
  }

  /**
   * The midi number as in
   * https://en.wikipedia.org/wiki/Scientific_pitch_notation#Table_of_note_frequencies
   *
   * Note that 12 is hard-coded here because that's how MIDI works.
   * Theoretically, this function should return non-integer values if
   * octaveDivisions happens to be a number other than 12. However I haven't
   * tested that functionality.
   *
   * @return {number}
   */
  get midiNumber() {
    return (this.note.id / musicTheory.octaveDivisions + this.octave + 1) * 12;
  }

  /**
   * The frequency of this pitch in hertz. Note that the numbers 69 and 12 are
   * hard-coded here because we're using MIDI to calculate the frequency, and
   * that's how MIDI works.
   *
   * @return {number}
   *
   */
  get frequency() {
    return 440 * Math.pow(2, (this.midiNumber - 69) / 12);
  }

  /**
   * Return the octave number used in Scientific Pitch Notation. Most of the
   * time this will be the same as this.octave. However, in cases like C♭
   * below middle C, SPI actually wants us to use "4" for the octave, even
   * though the pitch is in octave 3. This is annoying, but we can't change
   * the standard!
   *
   * @return {int}
   */
  get spiOctave() {
    return this.octave + this.note.guaranteedName.octaveBoundaryTraversal;
  }

  /**
   * @return {string}
   *   e.g. "C/4", "Bb/3", "F#/5"
   */
  get slashNotation() {
    return `${this.note.guaranteedName.ascii}/${this.spiOctave}`;
  }

}