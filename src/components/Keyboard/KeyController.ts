import type {Pitch} from '../../Utils/Music/Pitch';

const releaseTime = 0.15; // seconds
const truncationTime = 0.001; // seconds

/**
 * When multiple frequencies are present, they'll start with offsets to sound
 * like a guitar strum. The value specified below (in seconds) represents the
 * time between consecutive note attacks.
 */
const strumStagger = 0.03 // seconds

/**
 * Each Key component gets a corresponding KeyController instance to control
 * it. The KeyController instance gets passed into the Key component and the
 * Key component reads controller values like `isPressed` to determine how to
 * render. The KeyController is responsible for playing sound through a
 * SynthNote which it creates when needed. With this setup, both the Key
 * component and components above the Key component can control the pressing
 * and releasing of keys. Calling press() and release() on the controller
 * is sufficient to both (a) play sound, and (b) give visual cues within the
 * Key component that sound is playing.
 */
export class KeyController {

  audioContext: AudioContext;

  pitches: Pitch[];

  oscillators = [] as OscillatorNode[];

  gain = null as GainNode | null;

  state = 'resting' as 'resting' | 'playing' | 'releasing';

  releaseTimeoutId = null as number | null;

  /**
   * When null, this indicates that the key is not currently being pressed.
   * When set to a function this indicates that they key is currently being
   * pressed, AND gives us a method to release the synth upon release of the
   * key.
   */
  // doReleaseSynth = writable(null as null | (() => void));
  
  constructor(audioContext: AudioContext, pitches: Pitch[]) {
    this.audioContext = audioContext;
    this.pitches = pitches;
  }

  /**
   * Begins playing a SynthNote (sound to speakers!) and also tells the Key
   * component to render a visual indication that sound is playing.
   */
  press() {
    if (this.state === 'playing') {return;}
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
    this.pitches.map(pitch => pitch.frequency).forEach((frequency, i) => {
      const oscillator = this.audioContext.createOscillator();
      oscillator.connect(this.gain as GainNode); // unsure why TS complains here
      oscillator.type = 'triangle';
      oscillator.frequency.value = frequency;
      oscillator.start(this.audioContext.currentTime + i * strumStagger);
      this.oscillators = [...this.oscillators, oscillator];
    });
    this.state = 'playing';
  }

  release() {
    if (this.state !== 'playing') {return;}
    if (!this.gain) {return;}
    const points = new Float32Array([1, 0]);
    this.gain.gain.setValueCurveAtTime(
      points,
      this.audioContext.currentTime,
      releaseTime
    );
    this.releaseTimeoutId = setTimeout(() => this.reset(), releaseTime * 1000);
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

/**
 * We attach a KeyController to the DOM element so that we'll be able to
 * control this component upon finding the DOM element with
 * document.elementFromPoint(). So here, we define a type that lets TS see
 * our keyController property for what it is.
 */
export interface KeyElement extends Element {
  keyController: KeyController;
}