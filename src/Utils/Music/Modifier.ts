interface ModifierData {
  unicode: string,
  ascii: string,
  english: string,
  shortCode: string,
}

const modifiers: { [k: string]: ModifierData } = {
  'natural': {
    unicode: '',
    ascii: '',
    english: '',
    shortCode: 'n',
  },
  'flat': {
    unicode: '♭',
    ascii: 'b',
    english: 'flat',
    shortCode: 'f',
  },
  'sharp': {
    unicode: '♯',
    ascii: '#',
    english: 'sharp',
    shortCode: 's',
  },
  'doubleFlat': {
    unicode: '𝄫',
    ascii: 'bb',
    english: 'double flat',
    shortCode: 'F',
  },
  'doubleSharp': {
    unicode: '𝄪',
    ascii: '##',
    english: 'double sharp',
    shortCode: 'S',
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

  /**
   * A single character representation for the modifier, used when sending lots
   * of modifier data over the wire via JSON.
   */
  shortCode: string;
  
  constructor(modifierName: string) {
    this.name = modifierName;
    this.unicode = modifiers[modifierName].unicode;
    this.ascii = modifiers[modifierName].ascii;
    this.english = modifiers[modifierName].english;
    this.shortCode = modifiers[modifierName].shortCode;
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

  /**
   * Return a new modifier that matches the given short code.
   * 
   * @param shortCode e.g. 'n' or 'f', etc.
   */
  static fromShortCode(shortCode: string) {
    const modifierEntry = Object.entries(modifiers).find(
      ([name, data]: [string, ModifierData]) => data.shortCode === shortCode
    );
    return modifierEntry ? new Modifier(modifierEntry[0]) : undefined;
  }

}