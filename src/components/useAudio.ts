import { Pitch } from '../Utils/Music/Pitch';

// TODO: import type definitions for tone.js when they become available
// @ts-ignore
import Tone from "tone";

export interface Audio {
  playPitches: (pitches: Pitch[]) => void;
}

export function useAudio() {

  const audio = {} as Audio;

  /**
   * Generate sound for an array of notes, given their IDs.
   */
  audio.playPitches = (pitches: Pitch[]) => {
    const frequencies = pitches.map(pitch => pitch.frequency);
    const synth = new Tone.PolySynth(frequencies.length, Tone.Synth).toMaster();
    synth.triggerAttackRelease(frequencies, "8n", "+0.03")
  };

  return audio;
}
