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

}
