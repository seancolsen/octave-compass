/**
 * This represents a set of chords.
 */
export default class ChordSet {

  /**
   * The chords in this set.
   *
   * @type {Chord[]}
   */
  chords = [];

  constructor(chords) {
    this.chords = chords;
  }

  /**
   * How many chords are in this chord set?
   *
   * @return {number}
   */
  get count() {
    return this.chords.length;
  }

  /**
   * If you stack all the emblems, end to end, how big would they be?
   *
   * @return {number}
   */
  get totalEmblemSize() {
    return this.chords
      .map(chord => chord.emblemSize || 0)
      .reduce((a, b) => a + b, 0);
  }

}
