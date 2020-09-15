export default class SynthNote {

  audioContext: AudioContext;
  oscillator: OscillatorNode;
  gain: GainNode;

  constructor(audioContext: AudioContext, frequency: number) {
    this.audioContext = audioContext;
    this.gain = audioContext.createGain();
    this.oscillator = audioContext.createOscillator();
    this.gain.connect(audioContext.destination);
    this.oscillator.connect(this.gain);
    this.oscillator.type = 'triangle';
    this.oscillator.frequency.value = frequency;
  }

  attack() {
    this.oscillator.start();
  }

  release() {
    const releaseTime = 0.15; // seconds
    const points = new Float32Array([1, 0]);
    this.gain.gain.setValueCurveAtTime(
      points,
      this.audioContext.currentTime,
      releaseTime
    );
    setTimeout(() => {this.disconnect()}, releaseTime * 1000);
  }

  disconnect() {
    this.oscillator.stop();
    this.oscillator.disconnect();
    this.gain.disconnect();
  }

}
