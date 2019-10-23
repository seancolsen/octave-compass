import React, {useState, useMemo} from 'react';
import { IntervalSet } from '../Utils/Music/IntervalSet';
import { ChordSet } from '../Utils/Music/ChordSet';
import { Scalar } from '../Utils/Math/Scalar';
import { IntervalSetFactory } from '../Utils/Music/IntervalSetFactory';
import { Chord } from '../Utils/Music/Chord';
import { NoteSet } from '../Utils/Music/NoteSet';
import { PitchSet } from '../Utils/Music/PitchSet';
import { Scale } from '../Utils/Music/Scale';

const ordinalAbbreviations = [
  '0th',
  '1st',
  '2nd',
  '3rd',
  '4th',
  '5th',
];

interface State {
  tonalCenter: number,
  intervalSet: IntervalSet,
  selectedChords: ChordSet,
  clef: string,
};

interface Context extends State {
  noteSet: NoteSet;
  inversion: number | null;
  tonalCenterName: string;
  pitchSet: PitchSet;
  title: string;
  inversionText?: string;
  isNamed: boolean;
  shiftTonalCenter: (intervalDiff: number) => void;
  shiftIntervalSet: (rotation: number) => void;
  shiftMode: (amount: number) => void;
  toggleInterval: (ordinal: number) => void;
  toggleSelectedChord: (chord: Chord) => void;
  setSelectedChords: (chordSet: ChordSet) => void;
};

export const StoreContext = React.createContext<Context>({} as Context);

export function StoreProvider(props: {children: JSX.Element}) {

  const [tonalCenter, setTonalCenter] = useState<number>(0);
  const [intervalSet, setIntervalSet] = useState(IntervalSet.fromBinary(2741));
  const [selectedChords, setSelectedChords] = useState(ChordSet.fromDefaultChords);
  const [clef, setClef] = 'treble';

  /**
   * Set the intervalSet and try to figure out what Scale or Chord it is in the
   * process.
   */
  function setIntervalSetSmartly(i: IntervalSet) {
    setIntervalSet(IntervalSetFactory.fromIntervalSet(i));
  }

  // Partially fill up the context object by starting out with all the state
  // values.
  let context = {
    tonalCenter,
    intervalSet,
    selectedChords,
    clef,
  } as Context;

  context.noteSet = useMemo(() => (
    NoteSet.fromIntervalSet(context.intervalSet, -context.tonalCenter)
      .namedIfFeasible
  ), [context.intervalSet, context.tonalCenter]);

  context.inversion = useMemo(() => (
    context.intervalSet instanceof Chord
      ? context.intervalSet.inversion
      : null
  ), [context.intervalSet]);
  
  context.tonalCenterName = useMemo(() => (
    context.noteSet.rootNote(context.inversion || 0).nameToUseForLabels
  ), [context.intervalSet, context.tonalCenter]);
  
  context.pitchSet = useMemo(() => (
    context.noteSet.pitchSetStartingFrom(4)
  ), [context.intervalSet, context.tonalCenter]);
  
  context.title = useMemo(() => {
    const displayName = context.intervalSet.displayName;
    if (context.intervalSet instanceof Chord) {
      return `${context.tonalCenterName} ${displayName} chord`
    }
    else if (context.intervalSet instanceof Scale) {
      return `${context.tonalCenterName} ${displayName} Scale`;
    }
    else {
      return `${displayName} in ${context.tonalCenterName}`;
    }
  }, [context.intervalSet, context.tonalCenter]);
  
  context.inversionText = useMemo(() => (
    context.inversion
      ? ` (${ordinalAbbreviations[context.inversion]} inversion)`
      : undefined
  ), [context.inversion]);
  
  context.isNamed = useMemo(() => (
    context.intervalSet instanceof Chord || context.intervalSet instanceof Scale
  ), [context.intervalSet]);
  
  context.shiftTonalCenter = (intervalDiff: number) => {
    setTonalCenter(Scalar.wrapToOctave(tonalCenter - intervalDiff))
  };

  context.shiftIntervalSet = (rotation: number) => {
    setIntervalSetSmartly(intervalSet.shift(rotation))
  };

  context.shiftMode = (amount: number) => {
    setIntervalSetSmartly(intervalSet.modeShift(amount));
  };

  context.toggleInterval = (ordinal: number) => {
    setIntervalSetSmartly(intervalSet.toggleIntervalOrdinal(ordinal))
  };

  context.toggleSelectedChord = (chord: Chord) => {
    setSelectedChords(selectedChords.toggleChord(chord));
  };

  context.setSelectedChords = setSelectedChords;

  return (
    <StoreContext.Provider value={context}>
      {props.children}
    </StoreContext.Provider>
  );
}

