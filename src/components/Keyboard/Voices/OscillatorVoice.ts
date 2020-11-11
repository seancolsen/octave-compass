import type { Pitch } from "../../../Utils/Music/Pitch";
import { Voice, VoiceProps } from "./Voice";

export interface OscillatorVoiceProps extends VoiceProps {
  type?: OscillatorType;
}

const defaults: Required<Pick<OscillatorVoiceProps, 'type'>> = {
  type: 'sawtooth',
}

export class OscillatorVoice extends Voice {

  type: OscillatorType;
  
  oscillators = [] as OscillatorNode[];

  gain = null as GainNode | null;

  constructor(props: OscillatorVoiceProps) {
    super(props);
    const p = {...defaults, ...props};
    this.type = p.type;
  }

  onAttack(pitches: Pitch[]) {
    this.gain = this.audioContext.createGain();
    this.gain.connect(this.audioContext.destination);
    this.oscillators = [];
    pitches.map(pitch => pitch.frequency).forEach((frequency, i) => {
      const oscillator = this.audioContext.createOscillator();
      oscillator.connect(this.gain as GainNode); // unsure why TS complains here
      oscillator.type = this.type;
      oscillator.frequency.value = frequency;
      oscillator.start(this.audioContext.currentTime + i * this.strumStagger);
      this.oscillators = [...this.oscillators, oscillator];
    });
  }

  onRelease() {
    if (!this.gain) {return;}
    const points = new Float32Array([1, 0]);
    this.gain.gain.setValueCurveAtTime(
      points,
      this.audioContext.currentTime,
      this.releaseTime
    );
  }

  onReset() {
    this.oscillators.forEach(oscillator => {
      oscillator.stop();
      oscillator.disconnect();
    });
    if (this.gain) {
      this.gain.disconnect();
    }
    this.gain = null;
    this.oscillators = [];
  }
  
}
