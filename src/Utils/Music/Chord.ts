import { chords as chordsData } from "../../Data/chords";
import { IntervalSet } from "./IntervalSet";

export type NoteName = string | undefined;
export type ChordContents = (noteName: NoteName) => string

export interface ChordData {
  binary: number;
  name: string;
  abbreviation: string;
  weight: number;
  textSizeFactor: number;
  color: string;
  contents: ChordContents;
}

export class Chord {

  binary: number;
  name: string;
  abbreviation: string;
  weight: number;
  textSizeFactor: number;
  color: string;
  contents: ChordContents;

  constructor(data: ChordData) {
    this.binary = data.binary;
    this.name = data.name;
    this.abbreviation = data.abbreviation;
    this.weight = data.weight;
    this.textSizeFactor = data.textSizeFactor;
    this.color = data.color;
    this.contents = data.contents;
  }

  /**
   * Return an array of all possible chords.
   */
  static get allChords() {
    return chordsData.map(entry => new Chord(entry));
  }

  /**
   * Given the binary intervals of a chord, search for the definition of that
   * chord and return a Chord object if possible.
   */
  static fromBinary(binary: number) {
    const data = chordsData.find(data => data.binary === binary);
    if (!data) { throw new Error('Unknown chord'); }
    return new Chord(data);
  }

  /**
   * Look for a chord with the given name and return it if possible.
   */
  static fromName(name: string) {
    const data = chordsData.find(data => data.name === name);
    if (!data) { throw new Error('Unknown chord'); }
    return new Chord(data);
  }

  get intervalSet() {
    return IntervalSet.fromBinary(this.binary);
  }

}
