import type { Pitch } from "../../../Utils/Music/Pitch";
import { Shepard } from "./Shepard";
import { Voice, VoiceProps } from "./Voice";

interface Component {
  gain: GainNode,
  oscillator: OscillatorNode,
}

interface ShepardVoiceProps extends VoiceProps {
  oscillatorType?: OscillatorType,
  envelopeCenter?: number,
  envelopeWidth?: number,
}

const defaultProps = {
  oscillatorType: 'sawtooth' as OscillatorType,
}

/**
 * Reduce from 1 just a hair to avoid some clicking.
 */
const centralGainValue = 0.9;

export class ShepardVoice extends Voice {

  oscillatorType: OscillatorType;

  components = [] as Component[];

  centralGain = null as GainNode | null;

  shepard: Shepard;
  
  constructor(props: ShepardVoiceProps) {
    super(props);
    const p = {...defaultProps, props};
    this.oscillatorType = p.oscillatorType;
    this.shepard = new Shepard(props);
  }

  onAttack(pitches: Pitch[]) {
    this.centralGain = this.audioContext.createGain();
    this.centralGain.gain.value = centralGainValue;
    this.centralGain.connect(this.audioContext.destination);
    this.components = [];
    pitches.forEach((pitch, i) => {
      const time = this.audioContext.currentTime + i * this.strumStagger;
      this.attackPitch(pitch, time);
    });
  }

  private attackPitch(pitch: Pitch, atTime: number) {
    if (!this.centralGain) {return;}
    let components: Component[] = [];
    this.shepard.points(pitch).forEach(point => {
      const gain = this.audioContext.createGain();
      gain.connect(this.centralGain as GainNode); // unsure why TS complains
      gain.gain.value = point.gainValue;
      const oscillator = this.audioContext.createOscillator();
      oscillator.connect(gain);
      oscillator.type = this.oscillatorType;
      oscillator.frequency.value = point.oscillatorFrequency;
      oscillator.start(atTime);
      components = [...components, {gain, oscillator}];
    });
  }

  onRelease() {
    if (!this.centralGain) {return;}
    const points = new Float32Array([centralGainValue, 0]);
    this.centralGain.gain.setValueCurveAtTime(
      points,
      this.audioContext.currentTime,
      this.releaseTime
    );
  }

  onReset() {
    this.components.forEach(component => {
      component.oscillator.stop();
      component.oscillator.disconnect();
      component.gain.disconnect();
    });
    if (this.centralGain) {
      this.centralGain.disconnect();
    }
    this.centralGain = null;
    this.components = [];
  }
  
  
}