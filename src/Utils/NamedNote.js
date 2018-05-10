const modifiers = {
  'natural': {
    symbol: '',
    direction: 'none',
  },
  'flat': {
    symbol: '♭',
    direction: 'flat',
  },
  'sharp': {
    symbol: '♯',
    direction: 'sharp',
  },
  'doubleFlat': {
    symbol: '𝄫',
    direction: 'flat',
  },
  'doubleSharp': {
    symbol: '𝄪',
    direction: 'sharp',
  },
};

export default class NamedNote {

  /**
   * @type {Note}
   *   The note object containing this NamedNote
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
   * Return a not-so pretty version of this note name (e.g. "B flat").
   *
   * @return {string}
   */
  get ascii() {
    const modifier = (this.modifier === 'natural') ? '' : ' ' + this.modifier;
    return `${this.baseName}${modifier}`;
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
