import IntervalSet from "Utils/Music/IntervalSet";
import {chordsData} from "Data/chordsData";

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


  constructor(binary) {
    const chordData = chordsData[binary];
    if (!chordData) {
      throw new Error("Unknown chord");
    }
    super(binary);
    this.initializeValuesFromChordData(chordData);
  }

  initializeValuesFromChordData(chordData) {
    this.names = [chordData.name];
    this.defaultName = chordData.name + ' chord';
    this.symbol = chordData.symbol;
    this.color = chordData.color;
    this.weight = chordData.weight;
    this.emblemSize = chordData.emblemSize;
  }

}