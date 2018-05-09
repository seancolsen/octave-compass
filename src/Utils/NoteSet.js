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

}
