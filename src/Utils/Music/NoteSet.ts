import { musicTheory } from "./../../Data/musicTheory";
import { Note } from "./Note";
import { Scalar } from "./../Math/Scalar";
import { CustomMath } from "./../Math/CustomMath";
import { NoteNameSet } from "./NoteNameSet";
import { IntervalSet } from "./IntervalSet";

/**
 * Only name the NoteSet if we have 8 notes or fewer. With more notes, the notes
 * are more computationally intensive to name and having the note names is
 * less useful.
 */
const maxSetSizeToName: number = 8;

export class NoteSet {

  notes: Note[] = [];

  /**
   * This NoteSet starts out without any names. Names are filled in only when
   * necessary because that task is expensive.
   *
   * @type {NoteNameSet}
   */
  nameSet: NoteNameSet | null = null;

  constructor(notes: Note[]) {
    this.notes = notes;
  }

  /**
   * Return an array of Note objects containing all possible notes.
   */
  static get chromaticNotes(): Note[] {
    return [...Array(musicTheory.octaveDivisions).keys()].map(i => new Note(i));
  }

  /**
   * Return a new NoteSet containing all possible notes.
   */
  static get chromatic(): NoteSet {
    return new NoteSet(NoteSet.chromaticNotes);
  }

  /**
   * Return a new note set based on a given interval set and rotation.
   *
   * @param intervalSet
   * @param tonalCenter The rotation of the keyboard (clockwise)
   */
  static fromIntervalSetAndTonalCenter(
    intervalSet: IntervalSet,
    tonalCenter: number
  ): NoteSet {
    const allNotes = NoteSet.chromaticNotes;
    const notes = intervalSet.ordinals.map(i =>
      allNotes[Scalar.wrap(i + tonalCenter, musicTheory.octaveDivisions)]
    );
    return new NoteSet(notes);
  }

  get nameSetSignature() {
    return this.notes
      .map(note => note.name?.modifier.shortCode || '?')
      .join('');
  }
  
  /**
   * How many notes are in this notes set?
   */
  get count(): number {
    return this.notes.length;
  }

  /**
   * Returns an array containing one value per note in this set. Each value is
   * an array of possible modifiers for different ways that note can be named.
   *
   * @return e.g. for a C major chord:
   *   ```
   *   [
   *     ['natural', 'sharp', 'doubleFlat'],
   *     ['natural', 'flat', 'doubleSharp'],
   *     ['natural', 'doubleSharp', 'doubleFlat'],
   *   ]
   *   ```
   */
  get possibleModifiersForEachNoteName(): string[][] {
    return this.notes.map(note => Object.keys(note.possibleNames));
  }

  /**
   * **This is the big one**. This function generates *all* the possible sets of
   * note *names* for the notes within this note set. For example, say we have a
   * set of `7` notes and each note has three possible names. The total possible
   * note name sets is `3^7 = 2187`.
   */
  get possibleNoteNameSets() {
    return CustomMath.cartesianProduct(this.possibleModifiersForEachNoteName)
      .map(modifierKeys => NoteNameSet.fromModifiers(this, modifierKeys));
  }

  /**
   * Select all NoteNameSets that have the best possible score.
   */
  get bestNoteNameSets(): NoteNameSet[] {
    const lowestDemerits = Math.min(
      ...this.possibleNoteNameSets.map(s => s.demerits)
    );
    return this.possibleNoteNameSets.filter(s => s.demerits === lowestDemerits);
  }

  /**
   * Choose one NoteNameSet, even if multiple sets tie for the winning score.
   */
  get bestNoteNameSet(): NoteNameSet {
    return this.bestNoteNameSets[0];
  }

  /**
   * Return a new NoteSet that's identical to this one, except with the `names`
   * property filled in. We don't do this in the constructor because it's a
   * computationally intensive task, especially for larger note sets.
   */
  get named(): NoteSet {
    let result = new NoteSet(this.notes);
    result.nameSet = result.bestNoteNameSet;
    result.nameSet.noteNames.forEach(name => {
      name.note.name = name
    });
    return result;
  }

  /**
   * Return a NoteSet that *might* be named, but only if it's not too hard.
   * Naming large sets is hard, and not really that useful. Only name the
   * smaller sets.
   */
  get namedIfFeasible(): NoteSet {
    return (this.count <= maxSetSizeToName) ? this.named : this;
  }

  /**
   * Return a copied NoteSet with names added, if possible, according to the
   * given direction.
   */
  directionallyNamed(
    direction: string | null, fallback: null | string = null
  ): NoteSet {
    let result = new NoteSet(this.notes);
    result.notes.forEach((note, index, notes) => {
      notes[index] = note.namedToMatch(direction, fallback);
    });
    return result;
  }

  /**
   * Return the first note within this set.
   */
  get firstNote(): Note {
    return this.notes[0];
  }

  /**
   * Return a new IntervalSet that represents all the notes in this NotesSet.
   *
   * @param shift This should match the shift value used to create a new NoteSet
   *   from the returned IntervalSet.
   */
  toIntervalSet(shift: number = 0): IntervalSet {
    const ordinals = this.notes.map(note => note.id);
    const intervalSet = IntervalSet.fromOrdinals(ordinals);
    return intervalSet.shift(shift);
  }

  /**
   * Return a new note set that contains all the notes this set doesn't
   * contain. If this set has names, then try to give names to the complimentary
   * set too, so that they look nice together.
   */
  get compliment(): NoteSet {
    const direction = (this.nameSet) ? this.nameSet.direction : null;
    const complement = this.toIntervalSet(0).compliment;
    return NoteSet.fromIntervalSetAndTonalCenter(complement, 0)
      .directionallyNamed(direction, 'flat');
  }

  get tonalCenterId(): number {
    return this.firstNote.id;
  }

  /**
   * Return a nice looking string that describes the tonal center of this note
   * set.
   */
  get tonalCenterName(): string {
    return this.firstNote.nameToUseForLabels
  }

  /**
   * If this NoteSet represents a chord that's an inversion of a known chord,
   * this function will return the note that represents the root note of the
   * chord, when given that chord's inversion value.
   */
  rootNote(inversion: number): Note {
    const index = Scalar.wrap(-inversion, this.count);
    return this.notes[index];
  }

}