export default class SynthNote {

  audioContext: AudioContext;
  oscillators: OscillatorNode[];
  gain: GainNode;

  constructor(audioContext: AudioContext, frequencies: number[]) {
    this.audioContext = audioContext;
    this.gain = audioContext.createGain();
    this.gain.connect(audioContext.destination);
    this.oscillators = [];
    frequencies.forEach(frequency => {
      const oscillator = audioContext.createOscillator();
      oscillator.connect(this.gain);
      oscillator.type = 'triangle';
      oscillator.frequency.value = frequency;
      this.oscillators = [...this.oscillators, oscillator];
    });
  }

  attack() {
    /**
     * When multiple frequencies are present, they'll start with offsets to sound
     * like a guitar strum. The value specified below (in seconds) represents the
     * time between consecutive note attacks.
     */
    const strumStagger = 0.03 // seconds
    this.oscillators.forEach((osc, i) => {
      osc.start(this.audioContext.currentTime + i * strumStagger);
    });
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
    this.oscillators.forEach(oscillator => {
      oscillator.stop();
      oscillator.disconnect();
    });
    this.gain.disconnect();
  }

}
