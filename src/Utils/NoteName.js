import {modifiers} from '../Data/modifiers';

export default class NoteName {

  /**
   * @type {Note}
   *   The note object containing this NoteName
   */
  note;

  /**
   * @type {String}
   *   e.g. "natural", "flat", "sharp", "doubleFlat", "doubleSharp"
   */
  modifier;

  /**
   * @type {string}
   *   This will always be one character e.g. "C"
   */
  baseName;

  constructor(note, modifier, baseName) {
    this.note = note;
    this.modifier = modifier;
    this.baseName = baseName;
  }

  /**
   * Return a pretty version of this note name (e.g. "B♭").
   *
   * @return {string}
   */
  get unicode() {
    return `${this.baseName}${modifiers[this.modifier].symbol}`;
  }

  /**
   * Return a fully spelled-out version of this note name (e.g. "B flat").
   *
   * @return {string}
   */
  get spelledOut() {
    const modifier = (this.modifier === 'natural') ? '' : ' ' + this.modifier;
    return `${this.baseName}${modifier}`;
  }

  /**
   * Return an ASCII-compatible version of this note name (e.g. "Bb")
   *
   * @return {string}
   */
  get ascii() {
    return `${this.baseName}${modifiers[this.modifier].ascii}`;
  }

  /**
   * @return {string}
   */
  get direction() {
    return modifiers[this.modifier].direction;
  }

  /**
   * @return {boolean}
   */
  get isDouble() {
    return this.modifier === 'doubleFlat' || this.modifier === 'doubleSharp';
  }

}
