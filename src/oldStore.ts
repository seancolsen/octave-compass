import { IntervalSet } from './Utils/Music/IntervalSet';
import { ChordSet } from './Utils/Music/ChordSet';
import { Scalar } from './Utils/Math/Scalar';
import { IntervalSetFactory } from './Utils/Music/IntervalSetFactory';
import { Chord } from './Utils/Music/Chord';
import { NoteSet } from './Utils/Music/NoteSet';
import { Scale } from './Utils/Music/Scale';
import { OrdinalChord } from './Utils/Music/OrdinalChord';

export interface StoreInitialValues {
  tonalCenter: number,
  intervalSet: IntervalSet,
};

/**
 * Sometimes the initial values come from the URL and can be anything. But when
 * we don't have those values supplied from the URL (e.g. when the user goes to
 * the site without any specific path or during automated tests where we don't
 * have the context object) then we'll use these values as default.
 */
const defaultInitialValues: StoreInitialValues = {
  tonalCenter: 0,
  intervalSet: IntervalSet.fromBinary(2741),
}

const createStore = (initialValues: StoreInitialValues, audio: any) => ({
 

  /**
   * Returns a note set derived from the current interval set and named if
   * feasible.
   */
  get noteSet() {
    return NoteSet.fromIntervalSet(this.intervalSet, -this.tonalCenter)
      .namedIfFeasible;
  },

  /**
   * If the current interval set is a chord, then give the inversion of that
   * chord. If not, then give null.
   */
  get inversion() {
    return this.intervalSet instanceof Chord
      ? this.intervalSet.inversion
      : null;
  },
  
  /**
   * E.g. "G♭"
   */
  get tonalCenterName() {
    return this.noteSet.rootNote(this.inversion || 0).nameToUseForLabels;
  },
  
  /**
   * This puts the notes in the current interval set into a specific octave so
   * they can be played with audio.
   */
  get pitchSet() {
    return this.noteSet.pitchSetStartingFrom(4);
  },
  
  /**
   * The main text to display to the user that describes the current interval
   * set.
   */
  get title() {
    const displayName = this.intervalSet.displayName;
    if (this.intervalSet instanceof Chord) {
      return `${this.tonalCenterName} ${displayName} chord`
    }
    else if (this.intervalSet instanceof Scale) {
      return `${this.tonalCenterName} ${displayName} Scale`;
    }
    else {
      return `${displayName} in ${this.tonalCenterName}`;
    };
  },
  
  /**
   * E.g. "1st inversion"
   */
  get inversionText() {
    const ordinalAbbreviations = [
      '0th',
      '1st',
      '2nd',
      '3rd',
      '4th',
      '5th',
    ];
    return this.inversion
      ? ` (${ordinalAbbreviations[this.inversion]} inversion)`
      : undefined;
  },
  
  /**
   * True if we know the name of the current interval set.
   */
  get isNamed() {
    return this.intervalSet instanceof Chord || this.intervalSet instanceof Scale;
  },

  /**
   * Generate audio from the given notes!
   */
  playNotes(noteIds: number[]) {
    const pitches = this.pitchSet.pitches.filter(pitch =>
      noteIds.includes(pitch.note.id)
    );
    audio.playPitches(pitches);
  },

  /**
   * Generate audio from the given ordinals!
   */
  playIntervals(ordinals: number[]) {
    const notes = ordinals.map(ordinal =>
      Scalar.wrapToOctave(ordinal + this.tonalCenter)
    );
    this.playNotes(notes);
  },
  
  /**
   * Generate audio of a chord within the scale.
   */
  playOrdinalChord(ordinalChord: OrdinalChord) {
    this.playIntervals(ordinalChord.intervalSet.ordinals);
  },

  /**
   * E.g. when rotating the outer keyboard.
   */
  shiftTonalCenter(intervalDiff: number) {
    this.tonalCenter = Scalar.wrapToOctave(this.tonalCenter - intervalDiff);
  },


  /**
   * With Mobx, this function isn't necessary, but we provide it for backwards
   * compatibility with components that use a store with setter functions.
   */
  setTonalCenter(tonalCenter: number) {
    this.tonalCenter = tonalCenter;
  },


  /**
   * Turn on/off a type of chord to display within the scale.
   */
  toggleSelectedChord(chord: Chord) {
    this.selectedChords = this.selectedChords.toggleChord(chord);
  },


  
  /**
   * With Mobx, this function isn't necessary, but we provide it for backwards
   * compatibility with components that use a store with setter functions.
   */
  setSelectedChords(chordSet: ChordSet) {
    this.selectedChords = chordSet;
  },

}); // createStore
