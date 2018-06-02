import IntervalSet from "Utils/Music/IntervalSet";
import {chords as chordsData} from "Data/chords";

export default class Chord extends IntervalSet {

  /**
   * Chords really only have one name, but this is an array because it should
   * be compatible with IntervalSet.
   *
   * @type {string[]}
   */
  names;

  /**
   * e.g "major chord"
   *
   * @type {string}
   */
  defaultName;

  /**
   * This string contains SVG markup to display a formatted symbol for this
   * chord.
   *
   * @type {string}
   */
  symbol;

  /**
   * The CSS color to use for the emblem.
   *
   * @type {string}
   */
  color;

  /**
   * When multiple chords are displayed together, we sort them by weight,
   * ascending.
   *
   * @type {number}
   */
  weight;

  /**
   * The radius of the chord emblem.
   *
   * @type {number}
   */
  emblemSize;

  /**
   * A value of 1 means the default size, which is sized according to the
   * emblem size.
   *
   * @type {number}
   */
  textSizeFactor;

  /**
   * The number of inversions that the named chord will need to undergo in order
   * to match the IntervalSet described by this chord.
   *
   * @type {int}
   */
  inversion;

  constructor(chordData) {
    super(chordData);
    this.names = [chordData.name];
    this.defaultName = chordData.name;
    this.symbol = chordData.symbol;
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
  static get allChords() {
    return chordsData.map(entry => new Chord(entry));
  }

  /**
   * Given the binary intervals of a chord, search for the definition of that
   * chord and return a Chord object if possible.
   *
   * @param {int} binary
   * @return {Chord}
   * @throws {Error} if the chord can not be found
   */
  static fromBinary(binary) {
    const thisIntervalSet = IntervalSet.fromBinary(binary);
    let inversion = null;
    const chordDataEntry = chordsData.find(data => {
      const possibleIntervalSet = IntervalSet.fromBinary(data.binary);
      inversion = possibleIntervalSet
        .inversionsToBeIdenticalTo(thisIntervalSet);
      return Number.isInteger(inversion);
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

}
