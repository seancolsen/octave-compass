import { musicTheory } from "./../../Data/musicTheory";
import { Note } from "./Note";
import { Scalar } from "./../Math/Scalar";
import { CustomMath } from "./../Math/CustomMath";
import { NoteNameSet } from "./NoteNameSet";
import { IntervalSet } from "./IntervalSet";
import { Modifier } from "./Modifier";
import {default as computedData} from "../../Data/computedData.json";

/**
 * Only name the NoteSet if we have 8 notes or fewer. With more notes, the notes
 * are more computationally intensive to name and having the note names is
 * less useful.
 */
export const maxSetSizeToName: number = 8;

export class NoteSet {

  notes: Note[] = [];

  private isNamed: boolean = false;

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

  /**
   * Find the note within this set that has an ID matching the given ID.
   */
  noteById(id: number) {
    return this.notes.find(note => note.id === id);
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
  get namedViaBruteForce(): NoteSet {
    let result = new NoteSet(this.notes);
    result.nameSet = result.bestNoteNameSet;
    result.nameSet.noteNames.forEach(name => {
      name.note.name = name
    });
    result.isNamed = true;
    return result;
  }

  /**
   * Figure out what the tonal center is of this NoteSet.
   */
  get tonalCenter() {
    return this.notes[0].id;
  }

  /**
   * Figure out what the interval set is of this NoteSet. 
   */
  get intervalSet() {
    return IntervalSet
      .fromOrdinals(this.notes.map(note => note.id))
      .shift(-this.tonalCenter);
  }

  /**
   * Return a new Note set that uses the cached "Note Name Set Signature" to
   * name all the notes.
   *
   * @param noteNameSetSignature e.g. 'nnfnffn'
   */
  namedViaNoteNameSetSignature(noteNameSetSignature: string) {
    let result = new NoteSet(this.notes);
    [...noteNameSetSignature].forEach((modifierShortCode, index) => {
      const modifier = Modifier.fromShortCode(modifierShortCode);
      if (modifier) {
        result.notes[index] = result.notes[index].namedUsing(modifier.name);
      }
    });
    result.isNamed = true;
    return result;
  }

  /**
   * Return a new NoteSet that uses previously calculated NoteNames to quickly
   * name its notes without the performance hit of calculating them. If we don't
   * find a matching entry in the cache, then we skip naming.
   */
  get namedViaCache() {
    const scaleData = computedData.scales
      .find(scale => scale.binary === this.intervalSet.binary);
    const signature = scaleData?.noteNameSetSignatures?.[this.tonalCenter];
    return signature ? this.namedViaNoteNameSetSignature(signature) : this;
  }

  get namedViaCacheOrFlat() {
    const namedViaCache = this.namedViaCache;
    return namedViaCache.isNamed
      ? namedViaCache
      : this.directionallyNamed('flat');
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
    result.isNamed = true;
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