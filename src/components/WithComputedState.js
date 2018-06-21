import React from 'react';
import NoteSet from "Utils/Music/NoteSet";
import Chord from "Utils/Music/Chord";
import Scale from "Utils/Music/Scale";

const ordinalAbbreviations = [
  '0th',
  '1st',
  '2nd',
  '3rd',
  '4th',
  '5th',
];

export default class WithComputedState extends React.Component {

  tonalCenterName(noteSet) {
    const inversion = this.props.intervalSet.inversion || 0;
    const rootNote = noteSet.rootNote(inversion);
    return rootNote.nameToUseForLabels;
  }

  noteSet() {
    return NoteSet.fromIntervalSet(
      this.props.intervalSet,
      -this.props.tonalCenter
    ).namedIfFeasible;
  }

  pitchSet(noteSet) {
    //const clef = this.props.clef;
    // TODO: Set octave based on clef
    const octave = 4;
    return noteSet.pitchSetStartingFrom(octave);
  }

  inversionText() {
    const inversion = this.props.intervalSet.inversion;
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

  title(tonalCenterName) {
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
    let computedState = {};
    computedState.noteSet = this.noteSet();
    computedState.tonalCenterName = this.tonalCenterName(computedState.noteSet);
    computedState.pitchSet = this.pitchSet(computedState.noteSet);
    computedState.title = this.title(computedState.tonalCenterName);
    computedState.inversionText = this.inversionText();
    computedState.isNamed = this.isNamed();
    return this.props.children(computedState);
  }

}
