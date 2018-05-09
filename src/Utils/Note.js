import NoteName from "./NoteName";

export default class Note {

  constructor(noteData) {
    this.names = Object.entries(noteData.names).map(
      ([modifier, base]) => new NoteName(base, modifier)
    );
  }

  /**
   * Compute the color of the note, as displayed on a piano.
   *
   * @return {string}
   */
  get color() {
    return this.names.some(name => name.modifier === 'natural') ?
      'white' : 'black';
  }

}
