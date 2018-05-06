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
   *
   * @param nameType
   * @return {string}
   */
  name(nameType) {
    const name = (nameType === 'flat') ? this.flatName : this.sharpName;
    return Note.prettify(name);
  }

  /**
   * Convert a name like "B flat" to a name like "B♭"
   * @param asciiName
   */
  static prettify(asciiName) {
    const flat = '♭';
    const sharp = '♯';
    return asciiName
      .replace(/ ?flat/, flat)
      .replace(/ ?sharp/, sharp);
  }



}
