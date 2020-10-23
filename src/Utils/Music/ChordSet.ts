import { Chord } from "./Chord";
import { OrdinalChordSet } from "./OrdinalChordSet";
import type { IntervalSet } from "./IntervalSet";

/**
 * This represents a set of chords.
 */
export class ChordSet {

  /**
   * The chords in this set.
   */
  chords: Chord[] = [];

  constructor(chords: Chord[]) {
    this.chords = ChordSet.uniqueChords(ChordSet.sortedChords(chords));
  }

  /**
   * How many chords are in this chord set?
   */
  get count(): number {
    return this.chords.length;
  }

  /**
   * Given an array of Chords, return an array of the same Chords, but with
   * duplicates removed.
   */
  static uniqueChords(chords: Chord[]): Chord[] {
    const binaryValues = chords.map(chord => chord.binary);
    return chords.filter((chord, index) =>
      binaryValues.indexOf(chord.binary) === index
    );
  }

  /**
   * Sort an array of chords.
   */
  static sortedChords(chords: Chord[]): Chord[] {
    return chords.slice(0).sort(ChordSet.chordSortOrder);
  }

  /**
   * Compare two chords to determine how they should be sorted.
   */
  static chordSortOrder(chordA: Chord, chordB: Chord) {
    return chordA.weight - chordB.weight;
  }

  /**
   * Return true if this set contains the given chord, false otherwise.
   */
  containsChord(chord: Chord): boolean {
    return this.chords.some(c => c.binary === chord.binary);
  }

  /**
   * Return true if this set contains any of the given chords.
   */
  containsAny(chords: Chord[]): boolean {
    return this.chords.some(c => chords.some(_c => c.binary === _c.binary));
  }

  /**
   * Return a new ChordSet that's identical to this ChordSet, except with the
   * given chord added. If the given chord was already in the set, then the set
   * will be returned as-is.
   */
  addChord(chord: Chord): ChordSet {
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
   */
  removeChord(chord: Chord): ChordSet {
    const chords = this.chords.filter(c => c.binary !== chord.binary);
    return new ChordSet(chords);
  }

  /**
   * Return a new ChordSet that's identical to this ChordSet, except with the
   * given chord toggled. If the chord is already present, then remove it. If
   * the chord is not present, then add it.
   */
  toggleChord(chord: Chord): ChordSet {
    return this.containsChord(chord) ?
      this.removeChord(chord) : this.addChord(chord);
  }

  /**
   * Return a ChordSet containing all the possible chords.
   */
  static get fromAllChords(): ChordSet {
    return new ChordSet(Chord.allChords);
  }

  /**
   * Return a new ChordSet based on an array of chord names.
   */
  static fromChordNames(chordNames: string[]): ChordSet {
    return new ChordSet(chordNames.map(name => Chord.fromName(name)));
  }

  /**
   * Return the default set of chords that the app should have selected when it
   * starts.
   */
  static get fromDefaultChords(): ChordSet {
    return ChordSet.fromChordNames([
      'Major',
      'Minor',
      'Dominant 7',
    ]);
  }

  /**
   * Return a ChordSet that contains all the chords within the given
   * IntervalSet, at any ordinal.
   */
  static fromContainingIntervalSet(intervalSet: IntervalSet): ChordSet {
    const ordinalChordSets = OrdinalChordSet.arrayFromIntervalSet(
      intervalSet, ChordSet.fromAllChords
    );
    const chordSets = ordinalChordSets.map(ocs => ocs.chordSet);
    return ChordSet.fromUnion(chordSets);
  }

  /**
   * Given an array of ChordSets, return one ChordSet that contains all the
   * Chords contained in all the given ChordSets.
   */
  static fromUnion(chordSets: ChordSet[]) {
    const chords = chordSets.map(chordSet => chordSet.chords);
    const flattenedChords = chords.flat();
    return new ChordSet(flattenedChords);
  }

  /**
   * Compare this ChordSet to the given ChordSet. If the two contain all the
   * same chords, then return true. Return false otherwise.
   */
  equals(chordSet: ChordSet): boolean {
    return this.count === chordSet.count &&
      this.chords.every((chord, index) =>
        chord.binary === chordSet.chords[index].binary
      );
  }

}
