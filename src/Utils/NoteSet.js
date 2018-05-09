import {musicTheory} from "../Data/musicTheory";
import Note from './Note';
import Scalar from "./Scalar";

export default class NoteSet {

  /**
   * @param {Note[]} notes
   */
  constructor(notes) {
    this.notes = notes;
  }

  /**
   * Return an array of Note objects containing all possible notes.
   *
   * @return {Note[]}
   */
  static get chromaticNotes() {
    return musicTheory.notes.map(d => new Note(d));
  }

  /**
   * Return a new note set based on a given interval set and rotation.
   *
   * @param {IntervalSet} intervalSet
   *
   * @param {number} rotation
   *   The rotation of the keyboard (clockwise)
   *
   * @return {NoteSet}
   */
  static fromIntervalSet(intervalSet, rotation) {
    const allNotes = this.chromaticNotes;
    const notes = intervalSet.toArray().map(i =>
      allNotes[Scalar.wrap(i - rotation, musicTheory.octaveDivisions)]
    );
    return new NoteSet(notes);
  }

  /**
   * How many notes are in this notes set?
   *
   * @return {number}
   */
  get count() {
    return this.notes.length;
  }

  /**
   * Test whether the supplied name type will satisfy common music theory
   * conventions when naming notes. We want to make sure we don't have more than
   * one note in the set with the same base name.
   *
   * @param {string} nameType
   * @return {boolean}
   */
  nameTypeIsOk(nameType) {
    if (nameType === 'both') {
      return true;
    }
    const baseNames = this.notes.map(n => n.baseName(nameType));
    return baseNames.every((baseName) =>
      baseNames.filter(n => n === baseName).length === 1
    );
  }

  /**
   * Find the best strategy for naming all the notes in this set. First we see
   * if we can use the "flat name". If that doesn't produce a good result, then
   * we see if we can use the "sharp name". Finally, we fall back to "both" for
   * less-common sets of notes.
   *
   * @return {string}
   *   e.g. 'flat', 'sharp', or 'both'
   */
  get nameType() {
    return ['flat', 'sharp', 'both'].find(this.nameTypeIsOk.bind(this));
  }

}
