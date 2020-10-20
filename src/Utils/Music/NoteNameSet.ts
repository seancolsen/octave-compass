import { CustomMath } from './../Math/CustomMath';
import type { NoteName } from './NoteName';
import type { NoteSet } from './NoteSet';

const demeritFactors = {
  accidentalInsteadOfNatural: 1,
  mixOfSharpsAndFlats: 2,
  doubleModifier: 4,
  duplicateBaseNames: 7,
};

export class NoteNameSet {

  noteNames: NoteName[] = [];

  demerits: number = 0;

  constructor(noteNames: NoteName[]) {
    this.noteNames = noteNames;
    this.demerits = this.calculateDemerits();
  }

  /**
   * Return a new NoteNameSet that contains named notes for the given NoteSet,
   * according to the supplied array of modifiers. Each modifier should
   * correspond to a Note within the NoteSet, and the array indexes should be
   * the same between the modifiers and the Notes.
   */
  static fromModifiers(noteSet: NoteSet, modifierKeys: string[]) {
    const noteNames = noteSet.notes.map((note, index) =>
      note.possibleNames[modifierKeys[index]]
    );
    return new NoteNameSet(noteNames);
  }

  /**
   * If we have a consensus among all notes about the direction of their
   * modifiers (sharp vs flat), then return that direction. Otherwise return
   * `null`.
   *
   * @return {null|string}
   */
  get direction(): null | string {
    const sharps = this.noteNames.filter(n => n.direction === 'sharp').length;
    const flats = this.noteNames.filter(n => n.direction === 'flat').length;
    if (sharps === 0 && flats === 0) {
      return 'natural';
    }
    if (sharps > 0 && flats === 0) {
      return 'sharp';
    }
    if (flats > 0 && sharps === 0) {
      return 'flat';
    }
    return null;
  }

  /**
   * @return {number}
   */
  calculateDemerits(): number {
    return (
      this.accidentalInsteadOfNaturalDemerits +
      this.mixOfSharpsAndFlatsDemerits +
      this.doubleModifierDemerits +
      this.duplicateBaseNamesDemerits
    );
  }

  /**
   * We don't like seeing notes like "B sharp" (because that note should be
   * called "C" if possible), so we add demerits for each occurrence of an
   * accidental used for a note that has a natural name.
   *
   * @return {number}
   */
  get accidentalInsteadOfNaturalDemerits(): number {
    return this.noteNames.filter(noteName =>
      noteName.note.possibleNames.hasOwnProperty('natural') &&
      noteName.direction !== 'none'
    ).length * demeritFactors.accidentalInsteadOfNatural;
  }

  /**
   * We don't like sets of notes possibleNames that contain a mix of sharps and
   * flats. Ideally they should have possibleNames that are either all sharp or
   * all flat. Assign some demerits if we have a mix.
   *
   * @return {number}
   */
  get mixOfSharpsAndFlatsDemerits(): number {
    return (!this.direction) ? demeritFactors.mixOfSharpsAndFlats : 0;
  }

  /**
   * We don't like seeing "double sharp" or "double flat" in a set of notes, so
   * we add some demerits for each occurrence of a double modifier.
   *
   * @return {number}
   */
  get doubleModifierDemerits(): number {
    return this.noteNames.filter(n => n.isDouble)
      .length * demeritFactors.doubleModifier;
  }

  /**
   * We don't like sets of note possibleNames that contain note possibleNames
   * "C" and "C sharp". In this example, we'd prefer to name the notes as "C"
   * and "D flat", so we assign demerits for any duplicate base possibleNames in
   * order to prioritize sets of possibleNames that contain distinct base
   * possibleNames.
   *
   * @return {number}
   */
  get duplicateBaseNamesDemerits(): number {
    const baseNames = this.noteNames.map(name => name.baseName);
    const baseNameFrequency = CustomMath.valueFrequency(baseNames);
    const extraBaseNameCount = Object.entries(baseNameFrequency)
      .map(([baseName, frequency]) => frequency - 1).reduce((a, b) => a + b, 0);
    return extraBaseNameCount * demeritFactors.duplicateBaseNames;
  }

}