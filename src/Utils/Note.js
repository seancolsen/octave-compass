export default class Note {

  constructor(noteData) {
    this.sharpName = noteData.sharpName;
    this.flatName = noteData.flatName;
  }

  /**
   * Compute the color of the note, as displayed on a piano.
   *
   * @return {string}
   */
  get color() {
    return (this.sharpName === this.flatName) ? 'white' : 'black';
  }

  /**
   * Return the single-letter name for this note, even if it's a black key.
   *
   * @param {string} nameType
   *   e.g. 'flat', 'sharp', or 'both'
   *
   * @return {string}
   */
  baseName(nameType) {
    const map = {
      'flat': this.flatName.slice(0, 1),
      'sharp': this.sharpName.slice(0, 1),
      'both': `${this.sharpName} / ${this.flatName}`,
    };
    return map[nameType];
  }

  /**
   * Determine the name of this note according to the specified name type. When
   * both
   *
   * @param nameType
   *   e.g. 'flat', 'sharp', or 'both'
   *
   * @return {string|string[]}
   */
  name(nameType) {
    let map = {
      'flat': this.flatName,
      'sharp': this.sharpName,
      'both': (this.flatName === this.sharpName) ?
        this.flatName :
        [this.sharpName, this.flatName]
    };
    return Note.prettify(map[nameType]);
  }

  /**
   * Convert a name like "B flat" to a name like "B♭".
   *
   * @param asciiName
   */
  static prettify(asciiName) {
    if (asciiName.constructor === Array) {
      return asciiName.map(Note.prettify);
    }
    const flat = '♭';
    const sharp = '♯';
    return asciiName
      .replace(/ ?flat/, flat)
      .replace(/ ?sharp/, sharp);
  }

}
