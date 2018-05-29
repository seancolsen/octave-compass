const modifiers = {
  'natural': {
    unicode: '',
    ascii: '',
    english: '',
  },
  'flat': {
    unicode: '♭',
    ascii: 'b',
    english: 'flat',
  },
  'sharp': {
    unicode: '♯',
    ascii: '#',
    english: 'sharp',
  },
  'doubleFlat': {
    unicode: '𝄫',
    ascii: 'bb',
    english: 'double flat',
  },
  'doubleSharp': {
    unicode: '𝄪',
    ascii: '##',
    english: 'double sharp',
  },
};

export default class Modifier {

  constructor(modifierName) {
    this.name = modifierName;
    this.unicode = modifiers[modifierName].unicode;
    this.ascii = modifiers[modifierName].ascii;
    this.english = modifiers[modifierName].english;
  }

  /**
   * Return true if this modifier is doubleSharp or doubleFlat.
   *
   * @return {boolean}
   */
  get isDouble() {
    return this.name.includes('double');
  }

  /**
   * Which way is this modifier pointing
   *
   * @return {string}
   */
  get direction() {
    return (
      this.ascii.includes('#') ? 'sharp' :
      this.ascii.includes('b') ? 'flat' :
      'none'
    );
  }

}
