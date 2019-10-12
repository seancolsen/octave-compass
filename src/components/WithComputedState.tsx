import React from 'react';
import { IntervalSet } from '../Utils/Music/IntervalSet';
import { NoteSet } from '../Utils/Music/NoteSet';
import { Chord } from '../Utils/Music/Chord';
import { Scale } from '../Utils/Music/Scale';
import { PitchSet } from '../Utils/Music/PitchSet';

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
  inversionText: string | null;
  isNamed: boolean;
}

interface Props {
  intervalSet: IntervalSet;
  tonalCenter: number;
  children(state: ComputedState): React.Component;
}

export class WithComputedState extends React.Component<Props> {

  inversion() {
    if (this.props.intervalSet instanceof Chord) {
      return this.props.intervalSet.inversion;
    }
    return null;
  }
  
  tonalCenterName(noteSet: NoteSet) {
    const rootNote = noteSet.rootNote(this.inversion() || 0);
    return rootNote.nameToUseForLabels;
  }

  noteSet() {
    return NoteSet.fromIntervalSet(
      this.props.intervalSet,
      -this.props.tonalCenter
    ).namedIfFeasible;
  }

  pitchSet(noteSet: NoteSet) {
    //const clef = this.props.clef;
    // TODO: Set octave based on clef
    const octave = 4;
    return noteSet.pitchSetStartingFrom(octave);
  }

  inversionText() {
    const inversion = this.inversion();
    if (!inversion) {
      return null;
    }
    const ordinalAbbreviation = ordinalAbbreviations[inversion];
    return ` (${ordinalAbbreviation} inversion)`;
  }

  isNamed() {
    return this.props.intervalSet instanceof Chord ||
      this.props.intervalSet instanceof Scale;
  }

  title(tonalCenterName: string) {
    const displayName = this.props.intervalSet.displayName;
    if (this.props.intervalSet instanceof Chord) {
      return `${tonalCenterName} ${displayName} chord`
    }
    else if (this.props.intervalSet instanceof Scale) {
      return `${tonalCenterName} ${displayName} Scale`;
    }
    else {
      return `${displayName} in ${tonalCenterName}`;
    }
  }

  render() {
    let computedState = {} as ComputedState;
    computedState.noteSet = this.noteSet();
    computedState.tonalCenterName = this.tonalCenterName(computedState.noteSet);
    computedState.pitchSet = this.pitchSet(computedState.noteSet);
    computedState.title = this.title(computedState.tonalCenterName);
    computedState.inversionText = this.inversionText();
    computedState.isNamed = this.isNamed();
    return this.props.children(computedState);
  }

}
