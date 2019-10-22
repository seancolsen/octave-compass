import React from 'react';
import { Scalar } from "../Utils/Math/Scalar";
import { ObjectLog } from '../Utils/Misc/ObjectLog';
import { OrdinalChord } from '../Utils/Music/OrdinalChord';
import { PitchSet } from '../Utils/Music/PitchSet';

// TODO: import type definitions for tone.js when they become available
// @ts-ignore
import Tone from "tone";
import { StoreContext } from './Store';

export interface Audio {
  ordinalChordsPlayed: ObjectLog<OrdinalChord>;
  playNotes(noteIds: number[]): void;
  playIntervals(ordinals: number[]): void;
  playOrdinalChord(ordinalChord: OrdinalChord): void;
}

interface Props {
  pitchSet: PitchSet;
  children(audio: Audio): JSX.Element;
}

export function WithAudio(props: Props) {
  const [ordinalChordsPlayed, setOrdinalChordsPlayed] = 
    React.useState(new ObjectLog<OrdinalChord>());
  const store = React.useContext(StoreContext);
  
  const audio = {ordinalChordsPlayed} as Audio;

  /**
   * Generate sound for an array of notes, given their IDs.
   */
  audio.playNotes = (noteIds: number[]) => {
    const pitches = props.pitchSet.pitches.filter(pitch =>
      noteIds.includes(pitch.note.id)
    ).map(pitch => pitch.frequency);
    const synth = new Tone.PolySynth(pitches.length, Tone.Synth).toMaster();
    synth.triggerAttackRelease(pitches, "8n", "+0.03")
  };

  /**
   * Generate sound for an array of intervals, given their ordinals.
   */
  audio.playIntervals = (ordinals: number[]) => {
    const notes = ordinals.map(ordinal =>
      Scalar.wrapToOctave(ordinal + store.tonalCenter)
    );
    audio.playNotes(notes);
  };

  /**
   * Play a chord and highlight it.
   */
  audio.playOrdinalChord = (ordinalChord: OrdinalChord) => {
    setOrdinalChordsPlayed(ordinalChordsPlayed.add(ordinalChord));
    audio.playIntervals(ordinalChord.intervalSet.ordinals);
  };

  return props.children(audio);
}