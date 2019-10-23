import React, {useState} from 'react';
import { IntervalSet } from '../Utils/Music/IntervalSet';
import { ChordSet } from '../Utils/Music/ChordSet';
import { Scalar } from '../Utils/Math/Scalar';
import { IntervalSetFactory } from '../Utils/Music/IntervalSetFactory';
import { Chord } from '../Utils/Music/Chord';

interface State {
  tonalCenter: number,
  intervalSet: IntervalSet,
  selectedChords: ChordSet,
  clef: string,
};

interface Context extends State {
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

