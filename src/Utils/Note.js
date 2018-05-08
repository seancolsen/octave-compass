export default class Note {

  constructor(noteData) {
    this.sharpName = noteData.sharpName;
    this.flatName = noteData.flatName;
    this.useNames = noteData.useNames;
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
   * Determine the name of this note according to the specified name type. When
   * both
   *
   * @param nameType
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
