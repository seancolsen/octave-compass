import {musicTheory} from "../Data/musicTheory";
import Note from './Note';
import Scalar from "./Scalar";
import CustomMath from "./CustomMath";
import NamedNoteSet from './NamedNoteSet';

/**
 * Only name the NoteSet if we have 8 notes or fewer. With more notes, the notes
 * are more computationally intensive to name and having the note names is
 * less useful.
 *
 * @type {number}
 */
const maxSetSizeToName = 8;

export default class NoteSet {

  /**
   * @type {[Note]}
   */
  notes = [];

  /**
   * @type {[NamedNote]}
   */
  names = [];

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
    return [...Array(musicTheory.octaveDivisions).keys()].map(i => new Note(i));
  }

  /**
   * Return a new NoteSet containing all possible notes.
   *
   * @return {NoteSet}
   */
  static get chromatic() {
    return new NoteSet(NoteSet.chromaticNotes);
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
    const allNotes = NoteSet.chromaticNotes;
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
   * Returns an array containing one value per note in this set. Each value is
   * an array of possible modifiers for different ways that note can be named.
   *
   * @return {[[string]]}
   *   e.g. for a C major chord:
   *   [
   *     ['natural', 'sharp', 'doubleFlat'],
   *     ['natural', 'flat', 'doubleSharp'],
   *     ['natural', 'doubleSharp', 'doubleFlat'],
   *   ]
   */
  get possibleModifiersForEachNamedNote() {
    return this.notes.map(note => Object.keys(note.names));
  }

  /**
   * This is the big one. This function generates ALL the possible sets of note
   * NAMES for the notes within this note set. For example, say we have a set
   * of 7 notes and each note has three possible names. The total possible note
   * name sets is 3^7 = 2187.
   *
   */
  get possibleNamedNoteSets() {
    return CustomMath.cartesianProduct(...this.possibleModifiersForEachNamedNote)
      .map(modifierKeys => NamedNoteSet.fromModifiers(this, modifierKeys));
  }

  /**
   * Select all NamedNoteSets that have the best possible score.
   *
   * @return {[NamedNoteSet]}
   */
  get bestNamedNoteSets() {
    const lowestDemerits = Math.min(
      ...this.possibleNamedNoteSets.map(s => s.demerits)
    );
    return this.possibleNamedNoteSets.filter(s => s.demerits === lowestDemerits);
  }

  /**
   * Choose one NamedNoteSet, even if multiple sets tie for the winning score.
   *
   * @return {NamedNoteSet}
   */
  get bestNamedNoteSet() {
    return this.bestNamedNoteSets[0];
  }

  /**
   * Return a new NoteSet that's identical to this one, except with the `names`
   * property filled in. We don't do this in the constructor because it's a
   * computationally intensive task, especially for larger note sets.
   *
   * @return {NoteSet}
   */
  get named() {
    let result = new NoteSet(this.notes);
    result.names = result.bestNamedNoteSet.namedNotes;
    return result;
  }

  /**
   * Return a NoteSet that *might* be named, but only if it's not too hard.
   * Naming large sets is hard, and not really that useful. Only name the
   * smaller sets.
   *
   * @return {NoteSet}
   */
  get namedIfFeasible() {
    return (this.count <= maxSetSizeToName) ? this.named : this;
  }

  /**
   * Return the first note within this set.
   *
   * @return {Note}
   */
  get firstNote() {
    return this.notes[0];
  }

}
