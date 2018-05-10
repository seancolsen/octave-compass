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
   * Check to see if this note has a name of the given modifier type.
   *
   * @param {string} modifier
   */
  hasName(modifier) {
    return this.names.hasOwnProperty(modifier)
  }

  /**
   * Compute the color of the note, as displayed on a piano.
   *
   * @return {string}
   */
  get color() {
    return this.hasName('natural') ? 'white' : 'black';
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

  /**
   * Try to return a NamedNote for this note that will look good when placed
   * alongside other notes that consistently use the given direction. If this
   * note has a natural name, then we use that no matter what. If this note has
   * no natural natural name and the direction is 'none', then there's no
   * clear choice for how to name the note, so we return `null`.
   *
   * @param {null|string} direction
   *   e.g. 'sharp', 'flat', 'natural', null
   */
  namedToMatch(direction) {
    if (this.hasName('natural')) {
      return this.names.natural;
    }
    if (this.hasName(direction)) {
      return this.names[direction];
    }
    return null;
  }

}
