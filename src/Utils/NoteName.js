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

  constructor(baseName, modifier) {
    this.baseName = baseName;
    this.modifier = modifier;
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

}
