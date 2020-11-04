import type { Pitch } from "../../../Utils/Music/Pitch";
import { Voice, VoiceProps } from "./Voice";

export class TriangleVoice extends Voice {

  oscillators = [] as OscillatorNode[];

  gain = null as GainNode | null;

  constructor(props: VoiceProps) {
    super(props);
  }

  attack(pitches: Pitch[]) {
    if (this.state === 'playing') {return false;}
    if (this.state === 'releasing') {this.reset();}

    /**
     * This resume() call is here to accommodate the Chrome policy of suspending
     * until user interaction. Tutorials recommend running this with `await`,
     * but I had trouble with redundant key presses when making press() an async
     * function.
     */
    this.audioContext.resume();

    this.gain = this.audioContext.createGain();
    this.gain.connect(this.audioContext.destination);
    this.oscillators = [];
    pitches.map(pitch => pitch.frequency).forEach((frequency, i) => {
      const oscillator = this.audioContext.createOscillator();
      oscillator.connect(this.gain as GainNode); // unsure why TS complains here
      oscillator.type = 'triangle';
      oscillator.frequency.value = frequency;
      oscillator.start(this.audioContext.currentTime + i * this.strumStagger);
      this.oscillators = [...this.oscillators, oscillator];
    });
    this.state = 'playing';
    return true;
  }

  release() {
    if (this.state !== 'playing') {return;}
    if (!this.gain) {return;}
    const points = new Float32Array([1, 0]);
    this.gain.gain.setValueCurveAtTime(
      points,
      this.audioContext.currentTime,
      this.releaseTime
    );
    this.releaseTimeoutId = 
      window.setTimeout(() => this.reset(), this.releaseTime * 1000);
    this.state = 'releasing';
  }

  reset() {
    if (this.releaseTimeoutId) {
      clearTimeout(this.releaseTimeoutId);
      this.releaseTimeoutId = null;
    }
    this.oscillators.forEach(oscillator => {
      oscillator.stop();
      oscillator.disconnect();
    });
    if (this.gain) {
      this.gain.disconnect();
    }
    this.gain = null;
    this.oscillators = [];
    this.state = 'resting';
  }

  
}