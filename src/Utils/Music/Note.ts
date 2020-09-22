import { musicTheory } from "./../../Data/musicTheory";
import { NoteName } from "./NoteName";
import { Pitch } from "./Pitch";

export class Note {

  /**
   * C is 0. Id numbers increase from there.
   */
  id: number;

  possibleNames: { [k: string]: NoteName; } = {};

  /**
   * Notes are initialized without names because the name of the note depends on
   * context within the set of notes.
   */
  name: NoteName | undefined;

  constructor(id: number) {
    this.id = id;
    Object.entries(musicTheory.notes[id].names).forEach(([modifier, base]) => {
      this.possibleNames[modifier] = new NoteName(this, modifier, base);
    });
  }

  /**
   * Check to see if this note has a name of the given modifier type.
   */
  canBeNamedAs(modifier: string) {
    return this.possibleNames.hasOwnProperty(modifier)
  }

  /**
   * Compute the color of the note, as displayed on a piano.
   */
  get color(): string {
    return this.canBeNamedAs('natural') ? 'white' : 'black';
  }

  /**
   * Return a NoteName for this note which uses the given modifier.
   *
   * @param modifier e.g. "flat"
   */
  getNameUsing(modifier: string): NoteName {
    return this.possibleNames[modifier];
  }

  /**
   * Return a copy of this Note, with a name added, using the given modifier.
   *
   * @param modifier e.g. "sharp"
   */
  namedUsing(modifier: string): Note {
    if (!this.canBeNamedAs(modifier)) {
      throw new Error(`Cannot name note ${this.id} as ${modifier}`);
    }
    let result = new Note(this.id);
    result.name = this.possibleNames[modifier];
    return result;
  }

  /**
   * Try to return a NoteName for this note that will look good when placed
   * alongside other notes that consistently use the given direction. If this
   * note has a natural name, then we use that no matter what. If this note has
   * no natural natural name and the direction is `null`, then there's no
   * clear choice for how to name the note, so we return `null`.
   *
   * @param direction e.g. 'sharp', 'flat', 'natural', null
   * @param fallback A name type to use if `direction` isn't available
   */
  getNameToMatch(direction: null | string, fallback: null | string = null) {
    if (this.canBeNamedAs('natural')) {
      return this.possibleNames.natural;
    }
    if (direction && this.canBeNamedAs(direction)) {
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
   */
  namedToMatch(direction: string | null, fallback: string | null = null): Note {
    const name = this.getNameToMatch(direction, fallback);
    if (!name) {
      return this;
    }
    const result = new Note(this.id);
    result.name = name;
    return result;
  }

  get namesToUseForLabels(): NoteName[] {
    if (!this.name) {
      if (this.canBeNamedAs('natural')) {
        return [this.possibleNames.natural];
      }
      return [this.possibleNames.sharp, this.possibleNames.flat];
    }

    if (this.canBeNamedAs('natural') && this.name.modifier.name !== 'natural') {
      const names = [this.possibleNames.natural, this.name];
      return this.name.direction === 'flat' ? names : names.reverse();
    }

    return [this.name];
  }

  get nameToUseForLabels(): string {
    return this.namesToUseForLabels.map(name => name.unicode).join('/');
  }

  /**
   * If this note already has a name, then return it. Otherwise, return a "flat"
   * name.
   */
  get guaranteedName(): NoteName {
    // We use a non-null assertion operator here to tell Typescript that this
    // function won't return null. This is safe because, based on the note data,
    // `this.getNameToMatch('flat')` is definitely not going to return null
    // since every note either has a natural name (preferred) or a flat name.
    return this.name || this.getNameToMatch('flat')!;
  }

  /**
   * Return a Pitch that is within the given SPN octave.
   * 
   * @param octave
   *  The [SPN](https://en.wikipedia.org/wiki/Scientific_pitch_notation)
   *  octave number
   */
  pitchInOctave(octave: number) {
    return new Pitch(this, octave);
  }

  /**
   * Return a Pitch that is within one octave above the tonal center if the
   * tonal center is placed within the given SPN octave.
   * 
   * @param tonalCenter
   *  The Note ID of the tonal center that is currently set in the store.
   * 
   * @param tonalCenterOctave
   *  The [SPN](https://en.wikipedia.org/wiki/Scientific_pitch_notation)
   *  octave number in which we would like to place the tonal center.
   */
  pitchAboveTonalCenterInOctave(
    tonalCenter: number,
    tonalCenterOctave: number
  ) {
    const octave = tonalCenterOctave + (this.id < tonalCenter ? 1 : 0);
    return new Pitch(this, octave);
  }

}