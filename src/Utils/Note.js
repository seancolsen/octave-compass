import NamedNote from "./NamedNote";
import {musicTheory} from "../Data/musicTheory";

export default class Note {

  /**
   * C is 0. Id numbers increase from there.
   *
   * @type {int}
   */
  id;

  /**
   * @type {{string: NamedNote}}
   */
  names = {};

  constructor(id) {
    this.id = id;
    const noteData = musicTheory.notes[id];
    Object.entries(noteData.names).forEach(([modifier, base]) => {
      this.names[modifier] = new NamedNote(this, modifier, base);
    });
  }

  /**
   * Compute the color of the note, as displayed on a piano.
   *
   * @return {string}
   */
  get color() {
    return this.names.hasOwnProperty('natural') ? 'white' : 'black';
  }

  /**
   * Return a NamedNote for this note which uses the given modifier.
   *
   * @param {string} modifier
   *   e.g. "flat"
   * @return {NamedNote}
   */
  namedAs(modifier) {
    return this.names[modifier];
  }

}
