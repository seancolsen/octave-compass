export function ordinalAbbreviation(ordinal: number) {
  const finalDigit = ordinal % 10;
  const suffix =
      finalDigit === 1 ? 'st'
    : finalDigit === 2 ? 'nd'
    : finalDigit === 3 ? 'rd'
    : 'th';
  return `${ordinal}${suffix}`;
}

export type Genus = 'Chord' | 'Scale';

export interface IntervalSetNameProps {
  binary: number;
  baseName?: string;
  genus?: Genus;
  inversion?: number;
}

export class IntervalSetName {

  /**
   * The binary representation of the intervalSet.
   */
  binary: number;

  /**
   * e.g. For "Major Scale", the baseName would be "Major".
   */
  baseName?: string;
  
  /**
   * e.g. For "Major Scale", the genus would be "Scale". Will be undefined when
   * the scale is not named.
   */
  genus?: Genus;

  /**
   * e.g. for "Minor 7 chord (3rd inversion)", `inversion` would be 3.
   * 
   * - If we have an un-inverted chord, this will be 0.
   * - If we have a scale, this will be undefined. 
   */
  inversion?: number;

  constructor(props: IntervalSetNameProps) {
    this.binary = props.binary;
    this.baseName = props.baseName;
    this.genus = props.genus;
    this.inversion = props.inversion;
  }

  /**
   * e.g. "(3rd inversion)"
   */
  get inversionDescription() {
    if (this.inversion === undefined) { return undefined; }
    return `(${ordinalAbbreviation(this.inversion)} inversion)`;
  }
  
  /**
   * e.g. "Minor 7 Chord (3rd inversion)"
   */
  get full() {
    if (!this.genus) {
      return `Scale ${this.binary}`;
    }
    let result = `${this.baseName} ${this.genus}`;
    if (this.inversion) {
      result += ` ${this.inversionDescription}`;
    }
    return result;
  }

  /**
   * e.g. "The Harmonic Minor Scale", "a Major Chord"
   */
  get withArticle() {
    if (!this.genus) {
      return `Scale ${this.binary}`;
    }
    const article =
        this.genus === 'Scale' ? 'the '
      : this.genus === 'Chord' ? 'a '
      : '';
    return `${article}${this.baseName} ${this.genus}`;
  }
  
}
