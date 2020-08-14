import React, {FunctionComponent} from 'react';
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

function createStore(initialValues: StoreInitialValues) {

  const audio = useAudio();

  return {

    /**
     * The note at the top of the wheel, as an integer. 0 means C, 1 means C
     * and so on. 
     */
    tonalCenter: initialValues.tonalCenter,

    /**
     * Which intervals are enabled/disabled.
     */
    intervalSet: initialValues.intervalSet,

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


const StoreContext = React.createContext(createStore(defaultInitialValues));

interface StoreProviderProps {
  initialValues: StoreInitialValues,
};

export const StoreProvider: FunctionComponent<StoreProviderProps> = (props) => {
  const store = useLocalStore(() => createStore(props.initialValues));
  return <StoreContext.Provider value={store}>
    {props.children}
  </StoreContext.Provider>
}

export const useStore = () => React.useContext(StoreContext);