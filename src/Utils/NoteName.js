import Modifier from "./Modifier";

export default class NoteName {

  /**
   * @type {Note}
   *   A back-reference to the note object that contains this NoteName
   */
  note;

  /**
   * @type {Modifier}
   */
  modifier;

  /**
   * @type {string}
   *   This will always be one character e.g. "C"
   */
  baseName;

  constructor(note, modifierName, baseName) {
    this.note = note;
    this.modifier = new Modifier(modifierName);
    this.baseName = baseName;
  }

  /**
   * Return a pretty version of this note name (e.g. "B♭").
   *
   * @return {string}
   */
  get unicode() {
    return `${this.baseName}${this.modifier.unicode}`;
  }

  /**
   * Return a fully spelled-out version of this note name (e.g. "B flat").
   *
   * @return {string}
   */
  get spelledOut() {
    const phrase = this.modifier.english;
    return phrase ? `${this.baseName} ${phrase}` : this.baseName;
  }

  /**
   * Return an ASCII-compatible version of this note name (e.g. "Bb")
   *
   * @return {string}
   */
  get ascii() {
    return `${this.baseName}${this.modifier.ascii}`;
  }

  /**
   * @return {string}
   */
  get direction() {
    return this.modifier.direction;
  }

  /**
   * @return {boolean}
   */
  get isDouble() {
    return this.modifier.isDouble;
  }

  /**
   * A note name like "C♭" is special because its name and its pitch exist in
   * different octaves, as defined within the Scientific Pitch Notation
   * standard. So if you say "C♭4", the note is actually in octave 3.
   *
   * This function returns an integer that indicates how the note name is
   * traversing the octave. Most cases are 0. But a note like "C♭" or "C𝄫" is
   * 1 because the name is in the octave above the pitch.
   *
   * @return {int}
   */
  get octaveBoundaryTraversal() {
    if (this.baseName === 'C' && this.direction === 'flat') {
      return 1;
    }
    if (this.baseName === 'B' && this.direction === 'sharp') {
      return -1;
    }
    return 0;
  }

}
