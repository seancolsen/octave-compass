import React from 'react';
import { Scalar } from "../Utils/Math/Scalar";
import { ObjectLog } from '../Utils/Misc/ObjectLog';
import { OrdinalChord } from '../Utils/Music/OrdinalChord';
import { PitchSet } from '../Utils/Music/PitchSet';

// TODO: import type definitions for tone.js when they become available
// @ts-ignore
import Tone from "tone";

interface State {
  ordinalChordsPlayed: ObjectLog<OrdinalChord>;
}

export interface Audio extends State {
  playNotes(noteIds: number[]): void;
  playIntervals(ordinals: number[]): void;
  playOrdinalChord(ordinalChord: OrdinalChord): void;
}

interface Props {
  pitchSet: PitchSet;
  tonalCenter: number;
  children(audio: Audio): JSX.Element;
}

export class WithAudio extends React.Component<Props, State> {

  state: State;
  
  constructor(props: Props) {
    super(props);
    this.state = {
      ordinalChordsPlayed: new ObjectLog(),
    };
  }

  /**
   * Generate sound for an array of notes, given their IDs.
   */
  playNotes = (noteIds: number[]) => {
    const pitches = this.props.pitchSet.pitches.filter(pitch =>
      noteIds.includes(pitch.note.id)
    ).map(pitch => pitch.frequency);
    const synth = new Tone.PolySynth(pitches.length, Tone.Synth).toMaster();
    synth.triggerAttackRelease(pitches, "8n", "+0.03")
  };

  /**
   * Generate sound for an array of intervals, given their ordinals.
   */
  playIntervals = (ordinals: number[]) => {
    const notes = ordinals.map(ordinal =>
      Scalar.wrapToOctave(ordinal + this.props.tonalCenter)
    );
    this.playNotes(notes);
  };

  /**
   * Play a chord and highlight it.
   */
  playOrdinalChord = (ordinalChord: OrdinalChord) => {
    this.setState({
      ordinalChordsPlayed: this.state.ordinalChordsPlayed.add(ordinalChord),
    });
    this.playIntervals(ordinalChord.intervalSet.ordinals);
  };

  render() {
    return this.props.children({
      ordinalChordsPlayed: this.state.ordinalChordsPlayed,
      playNotes: this.playNotes,
      playIntervals: this.playIntervals,
      playOrdinalChord: this.playOrdinalChord,
    });
  }
}