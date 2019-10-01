interface ModifierData {
  [k: string]: string;
}

const modifiers: { [k: string]: ModifierData } = {
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

export class Modifier {

  /**
   * A machine-readable name for the modifier (e.g. 'doubleSharp')
   */
  name: string;

  /**
   * The fancy-looking unicode character for the musical notation of the 
   * modifier (e.g. '♭')
   */
  unicode: string;

  /**
   * An ASCII representation of the musical notation for the modifier (e.g. '#')
   */
  ascii: string;

  /**
   * The (lowercase) English language representation for the modifier
   * (e.g. 'double flat')
   */
  english: string;
  
  constructor(modifierName: string) {
    this.name = modifierName;
    this.unicode = modifiers[modifierName].unicode;
    this.ascii = modifiers[modifierName].ascii;
    this.english = modifiers[modifierName].english;
  }

  /**
   * Return true if this modifier is doubleSharp or doubleFlat.
   */
  get isDouble(): boolean {
    return this.name.includes('double');
  }

  /**
   * Which way is this modifier pointing
   */
  get direction() {
    return (
      this.ascii.includes('#') ? 'sharp' :
        this.ascii.includes('b') ? 'flat' :
          'none'
    );
  }

}