import React, {useState, useMemo} from 'react';
import { IntervalSet } from '../Utils/Music/IntervalSet';
import { ChordSet } from '../Utils/Music/ChordSet';
import { Scalar } from '../Utils/Math/Scalar';
import { IntervalSetFactory } from '../Utils/Music/IntervalSetFactory';
import { Chord } from '../Utils/Music/Chord';
import { NoteSet } from '../Utils/Music/NoteSet';
import { PitchSet } from '../Utils/Music/PitchSet';
import { Scale } from '../Utils/Music/Scale';
import { useAudio } from './useAudio';
import { OrdinalChord } from '../Utils/Music/OrdinalChord';

const ordinalAbbreviations = [
  '0th',
  '1st',
  '2nd',
  '3rd',
  '4th',
  '5th',
];

interface Props {
  initialTonalCenter?: number;
  initialIntervalSet?: IntervalSet;
  children: JSX.Element
}

interface State {
  tonalCenter: number,
  intervalSet: IntervalSet,
  selectedChords: ChordSet,
  clef: string,
};

interface Store extends State {
  noteSet: NoteSet;
  inversion: number | null;
  tonalCenterName: string;
  pitchSet: PitchSet;
  title: string;
  inversionText?: string;
  isNamed: boolean;
  setTonalCenter: (tonalCenter: number) => void;
  setIntervalSet: (intervalSet: IntervalSet) => void;
  shiftTonalCenter: (intervalDiff: number) => void;
  shiftIntervalSet: (rotation: number) => void;
  shiftMode: (amount: number) => void;
  toggleInterval: (ordinal: number) => void;
  toggleSelectedChord: (chord: Chord) => void;
  setSelectedChords: (chordSet: ChordSet) => void;
  playNotes(noteIds: number[]): void;
  playOrdinalChord(ordinalChord: OrdinalChord): void;
};

export const StoreContext = React.createContext<Store>({} as Store);

export function StoreProvider(props: Props) {

  const initialTonalCenter = props.initialTonalCenter || 0;
  const initialIntervalSet = props.initialIntervalSet
    || IntervalSet.fromBinary(2741);
  const [tonalCenter, setTonalCenter] = useState(initialTonalCenter);
  const [intervalSet, setIntervalSet] = useState(initialIntervalSet);
  const [selectedChords, setSelectedChords] = 
    useState(ChordSet.fromDefaultChords);
  const [clef, setClef] = 'treble';

  const audio = useAudio();

  /**
   * Set the intervalSet and try to figure out what Scale or Chord it is in the
   * process.
   */
  function setIntervalSetSmartly(i: IntervalSet) {
    setIntervalSet(IntervalSetFactory.fromIntervalSet(i));
  }

  // Partially fill up the context object by starting out with all the state
  // values.
  let store = {
    tonalCenter,
    intervalSet,
    selectedChords,
    clef,
  } as Store;

  store.noteSet = useMemo(() => (
    NoteSet.fromIntervalSet(store.intervalSet, -store.tonalCenter)
      .namedIfFeasible
  ), [store.intervalSet, store.tonalCenter]);

  store.inversion = useMemo(() => (
    store.intervalSet instanceof Chord
      ? store.intervalSet.inversion
      : null
  ), [store.intervalSet]);
  
  store.tonalCenterName = useMemo(() => (
    store.noteSet.rootNote(store.inversion || 0).nameToUseForLabels
  ), [store.intervalSet, store.tonalCenter]);
  
  store.pitchSet = useMemo(() => (
    store.noteSet.pitchSetStartingFrom(4)
  ), [store.intervalSet, store.tonalCenter]);
  
  store.title = useMemo(() => {
    const displayName = store.intervalSet.displayName;
    if (store.intervalSet instanceof Chord) {
      return `${store.tonalCenterName} ${displayName} chord`
    }
    else if (store.intervalSet instanceof Scale) {
      return `${store.tonalCenterName} ${displayName} Scale`;
    }
    else {
      return `${displayName} in ${store.tonalCenterName}`;
    }
  }, [store.intervalSet, store.tonalCenter]);
  
  store.inversionText = useMemo(() => (
    store.inversion
      ? ` (${ordinalAbbreviations[store.inversion]} inversion)`
      : undefined
  ), [store.inversion]);
  
  store.isNamed = useMemo(() => (
    store.intervalSet instanceof Chord || store.intervalSet instanceof Scale
  ), [store.intervalSet]);
  
  store.shiftTonalCenter = (intervalDiff: number) => {
    setTonalCenter(Scalar.wrapToOctave(tonalCenter - intervalDiff))
  };

  store.shiftIntervalSet = (rotation: number) => {
    setIntervalSetSmartly(intervalSet.shift(rotation))
  };

  store.shiftMode = (amount: number) => {
    setIntervalSetSmartly(intervalSet.modeShift(amount));
  };

  store.toggleInterval = (ordinal: number) => {
    setIntervalSetSmartly(intervalSet.toggleIntervalOrdinal(ordinal))
  };

  store.toggleSelectedChord = (chord: Chord) => {
    setSelectedChords(selectedChords.toggleChord(chord));
  };

  store.setSelectedChords = setSelectedChords;
  store.setTonalCenter = setTonalCenter;
  store.setIntervalSet = setIntervalSet;

  store.playNotes = (noteIds: number[]) => {
    const pitches = store.pitchSet.pitches.filter(pitch =>
      noteIds.includes(pitch.note.id)
    );
    audio.playPitches(pitches);
    // TODO: highlight
  }

  const playIntervals = (ordinals: number[]) => {
    const notes = ordinals.map(ordinal =>
      Scalar.wrapToOctave(ordinal + store.tonalCenter)
    );
    store.playNotes(notes);
  };
  
  store.playOrdinalChord = (ordinalChord: OrdinalChord) => {
    playIntervals(ordinalChord.intervalSet.ordinals);
    // TODO: highlight
  }

  return (
    <StoreContext.Provider value={store}>
      {props.children}
    </StoreContext.Provider>
  );
}

