import React from 'react';
import { NoteSet } from '../Utils/Music/NoteSet';
import { Chord } from '../Utils/Music/Chord';
import { Scale } from '../Utils/Music/Scale';
import { PitchSet } from '../Utils/Music/PitchSet';
import { StoreContext } from './Store';

const ordinalAbbreviations = [
  '0th',
  '1st',
  '2nd',
  '3rd',
  '4th',
  '5th',
];

interface ComputedState {
  noteSet: NoteSet;
  tonalCenterName: string;
  pitchSet: PitchSet;
  title: string;
  inversionText?: string;
  isNamed: boolean;
}

interface Props {
  children(state: ComputedState): JSX.Element;
}

export function WithComputedState(props: Props) {
  let computedState = {} as ComputedState;
  const store = React.useContext(StoreContext);
  const inversion = store.intervalSet instanceof Chord
    ? store.intervalSet.inversion
    : null;
  
  computedState.noteSet = NoteSet
    .fromIntervalSet(store.intervalSet, -store.tonalCenter)
    .namedIfFeasible;

  computedState.tonalCenterName = computedState
    .noteSet.rootNote(inversion || 0).nameToUseForLabels;

  computedState.pitchSet = computedState.noteSet.pitchSetStartingFrom(4);

  computedState.inversionText = inversion
    ? ` (${ordinalAbbreviations[inversion]} inversion)`
    : undefined;

  computedState.isNamed = store.intervalSet instanceof Chord ||
      store.intervalSet instanceof Scale;

  computedState.title = (() => {
    const displayName = store.intervalSet.displayName;
    if (store.intervalSet instanceof Chord) {
      return `${computedState.tonalCenterName} ${displayName} chord`
    }
    else if (store.intervalSet instanceof Scale) {
      return `${computedState.tonalCenterName} ${displayName} Scale`;
    }
    else {
      return `${displayName} in ${computedState.tonalCenterName}`;
    }
  })();

  return props.children(computedState);
}
