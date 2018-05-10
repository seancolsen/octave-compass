import NoteName from "./NoteName";

export default class Note {

  /**
   * @type {{string: NoteName}}
   */
  names = {};

  constructor(noteData) {
    Object.entries(noteData.names).forEach(([modifier, base]) => {
      this.names[modifier] = new NoteName(this, modifier, base);
    });
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

  /**
   * Return a NoteName for this note which uses the given modifier.
   *
   * @param {string} modifier
   *   e.g. "flat"
   * @return {NoteName}
   */
  namedAs(modifier) {
    return this.names[modifier];
  }

}
