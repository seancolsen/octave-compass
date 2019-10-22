import React from 'react';
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

  const [state, setState] = React.useState<State>({
  tonalCenter: 0, // TODO set via URL
  intervalSet: IntervalSet.fromBinary(2741), // TODO set via URL
  selectedChords: ChordSet.fromDefaultChords,
  clef: 'treble',
  });

  function setPartialState(partialState: Partial<State>) {
    setState({...state, ...partialState});
  }

  // Partially fill up the context object by starting out with all the state
  // values.
  let context = state as Context;

  context.shiftTonalCenter = (intervalDiff: number) => {
    setPartialState({
      tonalCenter: Scalar.wrapToOctave(state.tonalCenter - intervalDiff),
    })
  };

  context.shiftIntervalSet = (rotation: number) => {
    setPartialState({
      intervalSet:
        IntervalSetFactory.fromIntervalSet(state.intervalSet.shift(rotation)),
    });
  };

  context.shiftMode = (amount: number) => {
    setPartialState({
      intervalSet:
        IntervalSetFactory.fromIntervalSet(state.intervalSet.modeShift(amount)),
    });
  };

  context.toggleInterval = (ordinal: number) => {
    setPartialState({
      intervalSet: IntervalSetFactory.fromIntervalSet(
        state.intervalSet.toggleIntervalOrdinal(ordinal)
      ),
    });
  };

  context.toggleSelectedChord = (chord: Chord) => {
    setPartialState({
      selectedChords: state.selectedChords.toggleChord(chord),
    })
  };

  context.setSelectedChords = (selectedChords: ChordSet) => {
    setPartialState({
      selectedChords: selectedChords,
    });
  };

  return (
    <StoreContext.Provider value={context}>
      {props.children}
    </StoreContext.Provider>
  );
}

