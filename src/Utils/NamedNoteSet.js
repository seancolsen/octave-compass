import CustomMath from "./CustomMath";

const demeritFactors = {
  accidentalInsteadOfNatural: 1,
  mixOfSharpsAndFlats: 2,
  doubleModifier: 4,
  duplicateBaseNames: 7,
};

export default class NamedNoteSet {

  /**
   * @type {NamedNote[]}
   */
  namedNotes = [];

  /**
   * @type {number}
   */
  demerits = 0;

  /**
   * @param {NamedNote[]} namedNotes
   */
  constructor(namedNotes) {
    this.namedNotes = namedNotes;
    this.demerits = this.calculateDemerits();
  }

  /**
   * Return a new NamedNoteSet that contains named notes for the given NoteSet,
   * according to the supplied array of modifiers. Each modifier should
   * correspond to a Note within the NoteSet, and the array indexes should be
   * the same between the modifiers and the Notes.
   *
   * @param {NoteSet} noteSet
   * @param {string[]} modifierKeys
   */
  static fromModifiers(noteSet, modifierKeys) {
    const namedNotes = noteSet.notes.map((note, index) =>
      note.names[modifierKeys[index]]
    );
    return new NamedNoteSet(namedNotes);
  }

  /**
   * If we have a consensus among all notes about the direction of their
   * modifiers (sharp vs flat), then return that direction. Otherwise return
   * `null`.
   *
   * @return {null|string}
   */
  get direction() {
    const sharps = this.namedNotes.filter(n => n.direction === 'sharp').length;
    const flats = this.namedNotes.filter(n => n.direction === 'flat').length;
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
  calculateDemerits() {
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
  get accidentalInsteadOfNaturalDemerits() {
    return this.namedNotes.filter(namedNote =>
      namedNote.note.names.hasOwnProperty('natural') &&
      namedNote.direction !== 'none'
    ).length * demeritFactors.accidentalInsteadOfNatural;
  }

  /**
   * We don't like sets of notes names that contain a mix of sharps and flats.
   * Ideally they should have names that are either all sharp or all flat.
   * Assign some demerits if we have a mix.
   *
   * @return {number}
   */
  get mixOfSharpsAndFlatsDemerits() {
    return (!this.direction) ? demeritFactors.mixOfSharpsAndFlats : 0;
  }

  /**
   * We don't like seeing "double sharp" or "double flat" in a set of notes, so
   * we add some demerits for each occurrence of a double modifier.
   *
   * @return {number}
   */
  get doubleModifierDemerits() {
    return this.namedNotes.filter(n => n.isDouble)
      .length * demeritFactors.doubleModifier;
  }

  /**
   * We don't like sets of note names that contain note names "C" and "C sharp".
   * In this example, we'd prefer to name the notes as "C" and "D flat", so we
   * assign demerits for any duplicate base names in order to prioritize sets of
   * names that contain distinct base names.
   *
   * @return {number}
   */
  get duplicateBaseNamesDemerits() {
    const baseNames = this.namedNotes.map(name => name.baseName);
    const baseNameFrequency = CustomMath.valueFrequency(baseNames);
    const extraBaseNameCount = Object.entries(baseNameFrequency)
      .map(([baseName, frequency]) => frequency - 1).reduce((a, b) => a + b);
    return extraBaseNameCount * demeritFactors.duplicateBaseNames;
  }

}
