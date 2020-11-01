import type { NoteIdSet } from 'src/Utils/Music/NoteIdSet';
import type { Writable } from 'svelte/store';
import type {Pitch} from '../../Utils/Music/Pitch';
import type {
  LightingController,
  LightCommand,
} from '../Lighting/LightingController';

const releaseTime = 0.25; // seconds

/**
 * When multiple frequencies are present, they'll start with offsets to sound
 * like a guitar strum. The value specified below (in seconds) represents the
 * time between consecutive note attacks.
 */
const strumStagger = 0.03 // seconds

interface Props {
  audioContext: AudioContext,
  lightingController: LightingController,
  pitches: Pitch[],
  notesPlaying: Writable<NoteIdSet>,
}

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

  lightingDispatch: (lightCommand: LightCommand) => void;

  pitches: Pitch[];

  oscillators = [] as OscillatorNode[];

  gain = null as GainNode | null;

  state = 'resting' as 'resting' | 'playing' | 'releasing';

  releaseTimeoutId = null as number | null;

  notesPlaying: Writable<NoteIdSet>;

  constructor(props: Props) {
    this.audioContext = props.audioContext;
    this.pitches = props.pitches;
    this.notesPlaying = props.notesPlaying;

    /**
     * This function is used to select the correct lights to turn on and off
     * when pressing and releasing this key. It says: if one of the pitches in
     * this Key has a signature that matches one of the classes in the given
     * light, then the light matches and we want to include it in any commands
     * dispatched to lights.
     */
    const lightClassMatcher = (classes: string[]) => 
      classes.some(
        _class => props.pitches.map(p => `note-${p.note.id}`).includes(_class)
      );
    this.lightingDispatch = (lightCommand: LightCommand) => {
      props.lightingController.dispatch(lightClassMatcher, lightCommand)
    };
  } 

  get noteIds() {
    return this.pitches.map(pitch => pitch.note.id);
  }

  startVisuals() {
    this.lightingDispatch(l => l.turnOn());
    this.notesPlaying.update(np => np.add(this.noteIds));
  }

  stopVisuals() {
    this.lightingDispatch(l => l.turnOff());
    this.notesPlaying.update(np => np.delete(this.noteIds));
  }

  /**
   * Begins playing a SynthNote (sound to speakers!) and also tells the Key
   * component to render a visual indication that sound is playing.
   * 
   * @returns
   *   true if this function call actually changed the state fom not-pressed to
   *   pressed. Returns false if the key was already pressed.
   */
  press() {
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
    this.pitches.map(pitch => pitch.frequency).forEach((frequency, i) => {
      const oscillator = this.audioContext.createOscillator();
      oscillator.connect(this.gain as GainNode); // unsure why TS complains here
      oscillator.type = 'triangle';
      oscillator.frequency.value = frequency;
      oscillator.start(this.audioContext.currentTime + i * strumStagger);
      this.oscillators = [...this.oscillators, oscillator];
    });
    this.state = 'playing';
    this.startVisuals();
    return true;
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
    this.releaseTimeoutId = 
      window.setTimeout(() => this.reset(), releaseTime * 1000);
    this.state = 'releasing';
    this.stopVisuals();
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
    this.stopVisuals();
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