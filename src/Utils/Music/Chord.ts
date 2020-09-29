import { IntervalSet } from "./IntervalSet";
import {
  chords as chordsData,
  ChordData,
  ChordContents
} from "../../Data/chords";

export class Chord extends IntervalSet {

  /**
   * Chords really only have one name, but this is an array because it should
   * be compatible with IntervalSet.
   */
  names: string[];

  /**
   * e.g "major chord"
   */
  defaultName: string;

  /**
   * A component to render the formatted text that displays inside the chord
   * emblem.
   */
  contents: ChordContents;

  /**
   * The CSS color to use for the emblem.
   */
  color: string;

  /**
   * When multiple chords are displayed together, we sort them by weight,
   * ascending.
   */
  weight: number;

  /**
   * The radius of the chord emblem.
   */
  emblemSize: number;

  /**
   * A value of 1 means the default size, which is sized according to the
   * emblem size.
   */
  textSizeFactor: number;

  /**
   * The number of inversions that the named chord will need to undergo in order
   * to match the IntervalSet described by this chord.
   */
  inversion: number;

  constructor(chordData: ChordData) {
    super(chordData);
    this.type = "chord";
    this.names = [chordData.name];
    this.defaultName = chordData.name;
    this.contents = chordData.contents;
    this.color = chordData.color;
    this.weight = chordData.weight;
    this.emblemSize = chordData.emblemSize;
    this.textSizeFactor = chordData.textSizeFactor;
    this.inversion = chordData.inversion || 0;
  }

  /**
   * Return an array of all possible chords.
   *
   * @return {Chord[]}
   */
  static get allChords(): Chord[] {
    return chordsData.map(entry => new Chord(entry));
  }

  /**
   * Given the binary intervals of a chord, search for the definition of that
   * chord and return a Chord object if possible.
   * 
   * @throws {Error} if the chord can not be found
   */
  static fromBinary(binary: number): Chord {
    const thisIntervalSet = IntervalSet.fromBinary(binary);
    let inversion: number | undefined | null = undefined;
    const chordDataEntry = chordsData.find(data => {
      const possibleIntervalSet = IntervalSet.fromBinary(data.binary);
      inversion = possibleIntervalSet
        .inversionsToBeIdenticalTo(thisIntervalSet);
      return inversion != null;
    });
    if (!chordDataEntry) {
      throw new Error("Unknown chord");
    }

    // Copy chordDataEntry to a new object in order to avoid mutating it
    let chordData = Object.assign({}, chordDataEntry);
    chordData.inversion = inversion;
    chordData.binary = binary;
    return new Chord(chordData);
  }

  /**
   * Look for a chord with the given name and return it if possible.
   *
   * @param {string} name
   */
  static fromName(name: string) {
    const chordData = chordsData.find(data => data.name === name);
    if (!chordData) {
      throw new Error("Unknown chord");
    }
    return new Chord(chordData);
  }

}
