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
   * @return {string}
   */
  get direction() {
    return modifiers[this.modifier].direction;
  }

  /**
   * @return {boolean}
   */
  get isDouble() {
    return this.modifier === 'doubleSharp' || this.modifier === 'doubleSharp';
  }

}
