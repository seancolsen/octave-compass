import React from 'react';
import { IntervalSet } from '../Utils/Music/IntervalSet';
import { ChordSet } from '../Utils/Music/ChordSet';
import { Scalar } from '../Utils/Math/Scalar';
import { IntervalSetFactory } from '../Utils/Music/IntervalSetFactory';
import { Chord } from '../Utils/Music/Chord';
import { NoteSet } from '../Utils/Music/NoteSet';
import { Scale } from '../Utils/Music/Scale';
import { useAudio } from './useAudio';
import { OrdinalChord } from '../Utils/Music/OrdinalChord';
import {useLocalStore} from 'mobx-react-lite';


// interface State {
//   tonalCenter: number,
//   intervalSet: IntervalSet,
//   selectedChords: ChordSet,
//   clef: string,
// };

// interface Store extends State {
//   noteSet: NoteSet;
//   inversion: number | null;
//   tonalCenterName: string;
//   pitchSet: PitchSet;
//   title: string;
//   inversionText?: string;
//   isNamed: boolean;
//   setTonalCenter: (tonalCenter: number) => void;
//   setIntervalSet: (intervalSet: IntervalSet) => void;
//   shiftTonalCenter: (intervalDiff: number) => void;
//   shiftIntervalSet: (rotation: number) => void;
//   shiftMode: (amount: number) => void;
//   toggleInterval: (ordinal: number) => void;
//   toggleSelectedChord: (chord: Chord) => void;
//   setSelectedChords: (chordSet: ChordSet) => void;
//   playNotes(noteIds: number[]): void;
//   playOrdinalChord(ordinalChord: OrdinalChord): void;
// };

function createStore() {

  const audio = useAudio();

  return {

    /**
     * The note at the top of the wheel, as an integer. 0 means C, 1 means C
     * and so on. 
     */
    tonalCenter: 0,

    /**
     * Which intervals are enabled/disabled.
     */
    intervalSet: IntervalSet.fromBinary(2741),

    /**
     * Which chords are displayed to the user.
     */
    selectedChords: ChordSet.fromDefaultChords,

    /**
     * The clef to use when rendering a musical staff that contains the notes
     * in the scale.
     */
    clef: "treble",

    /**
     * Set the intervalSet and try to figure out what Scale or Chord it is in
     * the process. This has more of a performance hit than just setting the
     * interval set directly.
     */
    setIntervalSetSmartly(i: IntervalSet) {
      this.intervalSet = IntervalSetFactory.fromIntervalSet(i);
    },

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
      // TODO: highlight
    },
  
    playIntervals(ordinals: number[]) {
      const notes = ordinals.map(ordinal =>
        Scalar.wrapToOctave(ordinal + this.tonalCenter)
      );
      this.playNotes(notes);
    },
    
    playOrdinalChord(ordinalChord: OrdinalChord) {
      this.playIntervals(ordinalChord.intervalSet.ordinals);
      // TODO: highlight
    },

  }; // return

} // createStore


const StoreContext = React.createContext(createStore());

export const StoreProvider = ({children}: {children: JSX.Element}) => {
  const store = useLocalStore(createStore);
  
  return <StoreContext.Provider value={store}>
    {children}
  </StoreContext.Provider>
}

export const useStore = () => React.useContext(StoreContext);