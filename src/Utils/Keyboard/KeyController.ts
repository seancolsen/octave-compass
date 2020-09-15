import {writable, derived, get} from 'svelte/store';
import SynthNote from './SynthNote';
import type {Pitch} from '../Music/Pitch';

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

  pitch: Pitch;

  /**
   * When null, this indicates that the key is not currently being pressed.
   * When set to a function this indicates that they key is currently being
   * pressed, AND gives us a method to release the synth upon release of the
   * key.
   */
  doReleaseSynth = writable(null as null | (() => void));
  
  constructor(audioContext: AudioContext, pitch: Pitch) {
    this.audioContext = audioContext;
    this.pitch = pitch;
  }

  /**
   * We know a key is pressed when we have a function set for doReleaseSynth.
   */
  get isPressed () {
    return derived(this.doReleaseSynth, $r => !!$r);
  }

  /**
   * Begins playing a SynthNote (sound to speakers!) and also tells the Key
   * component to render a visual indication that sound is playing.
   */
  press() {
    if (get(this.isPressed)) {return;}
    
    // For chrome policy
    // Tutorials recommend running this with `await`, but I had trouble with
    // redundant key presses when making press() an async function.
    this.audioContext.resume();

    const synthNote = new SynthNote(this.audioContext, this.pitch.frequency);
    synthNote.attack();
    this.doReleaseSynth.set(() => synthNote.release());
  }

  /**
   * Begins the release of the SynthNote -- which will transition the sound
   * gradually to zero. Also changes the visual rendering of the Key
   * component to indicate that sound is no longer playing.
   */
  release() {
    const isPressed = get(this.isPressed);
    if (!isPressed) {return;}
    get(this.doReleaseSynth)();
    this.doReleaseSynth.set(null);
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