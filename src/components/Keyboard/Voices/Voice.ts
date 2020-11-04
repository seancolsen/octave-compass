import type { Pitch } from "../../../Utils/Music/Pitch";

export interface VoiceProps {
  audioContext: AudioContext;
}

export abstract class Voice {

  audioContext: AudioContext;

  state: 'resting' | 'playing' | 'releasing' = 'resting';

  releaseTimeoutId: number | null = null;

  releaseTime = 0.25; // seconds

  /**
   * When multiple frequencies are present, they'll start with offsets to sound
   * like a guitar strum. The value specified below (in seconds) represents the
   * time between consecutive note attacks.
   */
  strumStagger = 0.03 // seconds

  constructor(props: VoiceProps) {
    this.audioContext = props.audioContext;
  }

  abstract attack(pitches: Pitch[]): void
  
  abstract release(): void
  
  abstract reset(): void

}