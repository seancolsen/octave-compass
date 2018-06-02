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
   * The number of inversions that the named chord will need to undergo in order
   * to match the IntervalSet described by this chord.
   *
   * @type {int}
   */
  inversion;

  constructor(binary) {
    const thisIntervalSet = new IntervalSet(binary);
    let inversion = null;
    const chordData = chordsData
      .find(data => {
        const possibleIntervalSet = new IntervalSet(data.binary);
        inversion = possibleIntervalSet
          .inversionsToBeIdenticalTo(thisIntervalSet);
        return Number.isInteger(inversion);
      });
    if (!chordData) {
      throw new Error("Unknown chord");
    }
    super(binary);
    this.inversion = inversion;
    this.initializeValuesFromChordData(chordData);
  }

  initializeValuesFromChordData(chordData) {
    this.names = [chordData.name];
    this.defaultName = chordData.name;
    this.symbol = chordData.symbol;
    this.color = chordData.color;
    this.weight = chordData.weight;
    this.emblemSize = chordData.emblemSize;
  }

}
