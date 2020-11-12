import type { NoteIdSet } from '../../Utils/Music/NoteIdSet';
import type { Writable } from 'svelte/store';
import type {Pitch} from '../../Utils/Music/Pitch';
import type {
  LightingController,
  LightCommand,
} from '../Lighting/LightingController';
import type { Voice } from './Voices/Voice';
import type { Note } from 'src/Utils/Music/Note';
import { classMatcher } from '../Lighting/LightClasses';

type Props = {
  voice: Voice,
  lightingController: LightingController,
  notesPlaying: Writable<NoteIdSet>,
} & (
  { pitches: Pitch[] } |
  { notes: Note[] }
);

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

  voice: Voice;

  lightingDispatch: (lightCommand: LightCommand) => void;

  pitches: Pitch[];

  notesPlaying: Writable<NoteIdSet>;

  constructor(props: Props) {
    this.voice = props.voice;
    this.notesPlaying = props.notesPlaying;
    
    this.pitches = 'pitches' in props
      ? props.pitches
      : props.notes.map(note => note.pitchInOctave(4));

    const lightClassMatcher = classMatcher(props);
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
   * Begins playing a voice (sound to speakers!) and also tells the Key
   * component to render a visual indication that sound is playing.
   * 
   * @returns
   *   true if this function call actually changed the state fom not-pressed to
   *   pressed. Returns false if the key was already pressed.
   */
  press() {
    if (this.voice.state === 'playing') {return false;}
    if (this.voice.state === 'releasing') {this.reset();}
    this.voice.attack(this.pitches);
    this.startVisuals();
    return true;
  }

  release() {
    if (this.voice.state !== 'playing') {return;}
    this.voice.release();
    this.stopVisuals();
  }

  reset() {
    this.voice.reset();
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