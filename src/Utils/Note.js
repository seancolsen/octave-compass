export default class Note {

  /**
   * Convert a name like "B flat" to a name like "B♭"
   * @param asciiName
   */
  static prettyName(asciiName) {
    const flat = '♭';
    const sharp = '♯';
    return asciiName
      .replace(/ ?flat/, flat)
      .replace(/ ?sharp/, sharp);
  }

}
