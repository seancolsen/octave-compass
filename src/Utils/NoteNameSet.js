import Statistics from "./Statistics";

const demerits = {
  accidentalInsteadOfNatural: 1,
  mixOfSharpsAndFlats: 2,
  doubleModifier: 4,
  duplicateBaseNames: 5,
};

export default class NoteNameSet {

  /**
   * @type {NoteName[]}
   */
  noteNames = [];

  /**
   * @param {NoteName[]} noteNames
   */
  constructor(noteNames) {
    this.noteNames = noteNames;
  }

  /**
   *
   * @return {number}
   */
  get demerits() {
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
    return 0; // TODO
  }

  /**
   * We don't like sets of notes names that contain a mix of sharps and flats.
   * Ideally they should have names that are either all sharp or all flat.
   * Assign some demerits if we have a mix.
   *
   * @return {number}
   */
  get mixOfSharpsAndFlatsDemerits() {
    const sharps = this.noteNames.filter(n => n.direction === 'sharp').length;
    const flats = this.noteNames.filter(n => n.direction === 'flat').length;
    return (sharps > 0) && (flats > 0) ? demerits.mixOfSharpsAndFlats : 0;
  }

  /**
   * We don't like seeing "double sharp" or "double flat" in a set of notes, so
   * we add some demerits for each occurrence of a double modifier.
   *
   * @return {number}
   */
  get doubleModifierDemerits() {
    return 0; // TODO
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
    const baseNames = this.noteNames.map(name => name.baseName);
    const baseNameFrequency = Statistics.valueFrequency(baseNames);
    const extraBaseNameCount = Object.entries(baseNameFrequency)
      .map(([baseName, frequency]) => frequency - 1).reduce((a, b) => a + b);
    return extraBaseNameCount * demerits.duplicateBaseNames;
  }

}
