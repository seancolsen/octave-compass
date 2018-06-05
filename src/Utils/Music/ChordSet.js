import Chord from "Utils/Music/Chord";
import OrdinalChordSet from "Utils/Music/OrdinalChordSet";

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
    this.chords = ChordSet.uniqueChords(ChordSet.sortedChords(chords));
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
   * Given an array of Chords, return an array of the same Chords, but with
   * duplicates removed.
   *
   * @param {Chord[]} chords
   * @return {Chord[]}
   */
  static uniqueChords(chords) {
    const binaryValues = chords.map(chord => chord.binary);
    return chords.filter((chord, index) =>
      binaryValues.indexOf(chord.binary) === index
    );
  }

  /**
   * Sort an array of chords.
   *
   * @param {Chord[]} chords
   * @return {Chord[]}
   */
  static sortedChords(chords) {
    return chords.slice(0).sort(ChordSet.chordSortOrder);
  }

  /**
   * Compare two chords to determine how they should be sorted.
   *
   * @param {Chord} chordA
   * @param {Chord} chordB
   */
  static chordSortOrder(chordA, chordB) {
    return chordA.weight - chordB.weight;
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

  /**
   * Return true if this set contains the given chord, false otherwise.
   *
   * @param {Chord} chord
   * @return {boolean}
   */
  containsChord(chord) {
    return this.chords.some(c => c.binary === chord.binary);
  }

  /**
   * Return a new ChordSet that's identical to this ChordSet, except with the
   * given chord added. If the given chord was already in the set, then the set
   * will be returned as-is.
   *
   * @param {Chord} chord
   * @return {ChordSet}
   */
  addChord(chord) {
    const chords = this.chords.slice(0);
    if (!this.containsChord(chord)) {
      chords.push(chord);
    }
    return new ChordSet(chords);
  }

  /**
   * Return a new ChordSet that's identical to this ChordSet, except with the
   * given chord removed. If the given chord was not in the set to begin with,
   * then the set will be returned as-is.
   *
   * @param {Chord} chord
   * @return {ChordSet}
   */
  removeChord(chord) {
    const chords = this.chords.filter(c => c.binary !== chord.binary);
    return new ChordSet(chords);
  }

  /**
   * Return a new ChordSet that's identical to this ChordSet, except with the
   * given chord toggled. If the chord is already present, then remove it. If
   * the chord is not present, then add it.
   *
   * @param {Chord} chord
   * @return {ChordSet}
   */
  toggleChord(chord) {
    return this.containsChord(chord) ?
      this.removeChord(chord) : this.addChord(chord);
  }

  /**
   * Return a ChordSet containing all the possible chords.
   *
   * @return {ChordSet}
   */
  static get fromAllChords() {
    return new ChordSet(Chord.allChords);
  }

  /**
   * Return a new ChordSet based on an array of chord names.
   *
   * @param {string[]} chordNames
   * @return {ChordSet}
   */
  static fromChordNames(chordNames) {
    return new ChordSet(chordNames.map(name => Chord.fromName(name)));
  }

  /**
   * Return the default set of chords that the app should have selected when it
   * starts.
   *
   * @return {ChordSet}
   */
  static get fromDefaultChords() {
    return ChordSet.fromChordNames([
      'major',
      'minor',
      'dominant 7',
      'diminished',
      'augmented',
    ]);
  }

  /**
   * Return a ChordSet that contains all the chords within the given
   * IntervalSet, at any ordinal.
   *
   * @param {IntervalSet} intervalSet
   * @return {ChordSet}
   */
  static fromContainingIntervalSet(intervalSet) {
    const ordinalChordSets = OrdinalChordSet.arrayFromIntervalSet(
      intervalSet, ChordSet.fromAllChords
    );
    const chordSets = ordinalChordSets.map(ocs => ocs.chordSet);
    return ChordSet.fromUnion(chordSets);
  }

  /**
   * Given an array of ChordSets, return one ChordSet that contains all the
   * Chords contained in all the given ChordSets.
   *
   * @param {ChordSet[]} chordSets
   */
  static fromUnion(chordSets) {
    const chords = chordSets.map(chordSet => chordSet.chords);
    const flattenedChords = [].concat(...chords);
    return new ChordSet(flattenedChords);
  }

}
