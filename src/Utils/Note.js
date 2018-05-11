import NoteName from "./NoteName";
import {musicTheory} from "../Data/musicTheory";

export default class Note {

  /**
   * C is 0. Id numbers increase from there.
   *
   * @type {int}
   */
  id;

  /**
   * @type {{string: NoteName}}
   */
  possibleNames = {};

  /**
   * Notes are initialized without names because the name of the note depends on
   * context within the set of notes.
   *
   * @type {NoteName}
   */
  name;

  constructor(id) {
    this.id = id;
    const noteData = musicTheory.notes[id];
    Object.entries(noteData.names).forEach(([modifier, base]) => {
      this.possibleNames[modifier] = new NoteName(this, modifier, base);
    });
  }

  /**
   * Check to see if this note has a name of the given modifier type.
   *
   * @param {string} modifier
   */
  canBeNamedAs(modifier) {
    return this.possibleNames.hasOwnProperty(modifier)
  }

  /**
   * Compute the color of the note, as displayed on a piano.
   *
   * @return {string}
   */
  get color() {
    return this.canBeNamedAs('natural') ? 'white' : 'black';
  }

  /**
   * Return a NoteName for this note which uses the given modifier.
   *
   * @param {string} modifier
   *   e.g. "flat"
   * @return {NoteName}
   */
  getNameUsing(modifier) {
    return this.possibleNames[modifier];
  }

  /**
   * Try to return a NoteName for this note that will look good when placed
   * alongside other notes that consistently use the given direction. If this
   * note has a natural name, then we use that no matter what. If this note has
   * no natural natural name and the direction is 'none', then there's no
   * clear choice for how to name the note, so we return `null`.
   *
   * @param {null|string} direction
   *   e.g. 'sharp', 'flat', 'natural', null
   * @param {null|string} fallback
   *   A name type to use if `direction` isn't available
   */
  getNameToMatch(direction, fallback = null) {
    if (this.canBeNamedAs('natural')) {
      return this.possibleNames.natural;
    }
    if (this.canBeNamedAs(direction)) {
      return this.possibleNames[direction];
    }
    if (fallback && this.canBeNamedAs(fallback)) {
      return this.possibleNames[fallback];
    }
    return null;
  }

  /**
   * Return a copy of this note with a name added to match the given direction,
   * if possible
   *
   * @param {string} direction
   * @param {string|null} fallback
   * @return {Note}
   */
  namedToMatch(direction, fallback = null) {
    const name = this.getNameToMatch(direction, fallback);
    if (!name) {
      return this;
    }
    const result = new Note(this.id);
    result.name = name;
    return result;
  }

  /**
   *
   * @return {NoteName[]}
   */
  get namesToUseForLabels() {
    if (!this.name) {
      if (this.canBeNamedAs('natural')) {
        return [this.possibleNames.natural];
      }
      return [this.possibleNames.sharp, this.possibleNames.flat];
    }

    if (this.name.isDouble) {
      if (this.canBeNamedAs('natural')) {
        const names = [this.possibleNames.natural, this.name];
        return this.name.direction === 'flat' ? names : names.reverse();
      }
    }

    return [this.name];
  }

}
