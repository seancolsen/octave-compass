import { writable, derived, get} from 'svelte/store';
import type { IntervalSet } from './Utils/Music/IntervalSet';
import { ChordSet } from './Utils/Music/ChordSet';
import { NoteSet } from './Utils/Music/NoteSet';
import type { Chord } from './Utils/Music/Chord';
import { Scalar } from './Utils/Math/Scalar';
import { KeyController, KeyElement } from './components/Keyboard/KeyController';
import { setContext, getContext } from 'svelte';
import { LightingController } from './components/Lighting/LightingController';
import { RotationController } from './components/Wheel/Rotator/RotationController';
import { NoteIdSet } from './Utils/Music/NoteIdSet';
import type { Voice } from './components/Keyboard/Voices/Voice';
import type { Pitch } from './Utils/Music/Pitch';
import { ShepardVoice } from './components/Keyboard/Voices/ShepardVoice';
import { Note } from './Utils/Music/Note';

/**
 * ABOUT THIS FILE:
 *
 * - The `====` line comments serve to delineate stores from one
 *   another.
 * - When one store needs several intermediate variables before I wrap
 *   it in an IIFE so that those variables can have their own scope.
 *
 * Originally, I used separate files for all these stores, which is an approach
 * that I still think has some merit. But in the end I settled on putting
 * everything into one file since it makes imports easier and derived stores
 * easier.
 *
 */

export const createStore = (
  initialTonalCenter: number,
  initialIntervalSet: IntervalSet,
) => ({

  // ======================================================================== //

  /**
   * A value of 0 means "Edit". When edit is enabled, the user can rotate the
   * scale and keyboard as well as toggle intervals on/off.
   * 
   * A value of 1 means "Play". When play is enabled, the user can play sounds.
   * 
   * Values in between 0 and 1 mean that the app is transitioning between states
   * and that no interaction should be possible. 
   */
  editVsPlay: (() => {
    const {subscribe, update, set} = writable(1);

    return {
      subscribe,
      set,
      update,

      setWithTransition: (newValue: 0 | 1) => {
        const currentValue = get({subscribe}) as number;
        
        if (currentValue === newValue) {return;}
        const transitionDuration = 200; // (ms)
        const direction = newValue ? 1 : -1;
        const startValue = Math.round(currentValue);
        const step = (currentTime: DOMHighResTimeStamp) => {
          const timeElapsed = currentTime - transitionStartTime;
          if (timeElapsed > transitionDuration) {
            set(newValue)
            return;
          }
          set(startValue + timeElapsed / transitionDuration * direction);
          window.requestAnimationFrame(step)
        };
        const transitionStartTime = performance.now();
        window.requestAnimationFrame(step)
      },
    }
  })(),

  // ======================================================================== //

  /**
   * When in edit mode, we make the keyboard a bit bigger.
   */
  get keyboardRadius() {
    return derived(this.editVsPlay, editVsPlay => 
      Scalar.interpolate(editVsPlay, [0, 1], [400, 440])
    )
  },

  // ======================================================================== //

  /**
   * Which intervals are enabled.
   */
  intervalSet: (() => {
    const {subscribe, update} = writable(initialIntervalSet);

    type Updater = (oldIntervalSet: IntervalSet) => IntervalSet;
    
    /**
     * We run any newly computed IntervalSet through this function in order to
     * determine which Scale or Chord the new IntervalSet is. This has more of a
     * performance hit than just setting the interval set directly.
     */
    function smartUpdate(updater: Updater) {
      update(intervalSet => updater(intervalSet).analyzed);
    }
    
    return {
      subscribe, smartUpdate,
    
      /**
       * Turn on/off one interval within the set.
       */
      toggleInterval(ordinal: number) {
        smartUpdate(intervalSet => intervalSet.toggleIntervalOrdinal(ordinal));
      },
    
      /**
       * Rotate the inner scale polygon clockwise by the number (of half steps)
       * given. Note that it may fall on an intervalSet without a tonal center.
       */
      shift(rotation: number) {
        smartUpdate(intervalSet => intervalSet.shift(rotation));
      },
    
      /**
       * Rotate the inner scale polygon clockwise. When 1 is given as an argument,
       * rotate the polygon clockwise to its next vertex. When 2 is given, go 2
       * vertices and so on.
       */
      shiftMode(amount: number) {
        smartUpdate(intervalSet => intervalSet.modeShift(amount));
      },
    };
    
  })(),

  // ======================================================================== //

  /**
   * The note at the top of the wheel, as an integer. 0 means C, 1 means C
   * and so on. 
   */
  tonalCenter: (() => {
    const {subscribe, set, update} = writable(initialTonalCenter);

    return {
      subscribe, set, update,

      /**
       * E.g. when rotating the outer keyboard.
       */
      shift(intervalDiff: number) {
        update(tonalCenter => Scalar.wrapToOctave(tonalCenter - intervalDiff));
      },
    }
    
  })(),

  // ======================================================================== //

  /**
   * This is just here to displaying the chord polygon for currently-playing
   * notes. It has nothing to do with the functionality that lights up keys when
   * pressed. That all happens in LightController.
   */
  notesPlaying: writable(NoteIdSet.fromArray([])),
  
  // ======================================================================== //

  /**
   * Which chords are displayed to the user.
   */
  selectedChords: (() => {
    const {subscribe, set, update} = writable(ChordSet.fromDefaultChords);

    return {
      subscribe, set, update,

      /**
       * Turn on/off a type of chord to display within the scale.
       */
      toggle(chord: Chord) {
        update(selectedChords => selectedChords.toggleChord(chord))
      },

    };
  })(),

  // ======================================================================== //

  /**
   * Gives the set of notes that fall on the active intervals, given the tonal
   * center.
   */
  get noteSet() {
    return derived([this.intervalSet, this.tonalCenter], ([is, tc]) =>
      NoteSet.fromIntervalSetAndTonalCenter(is, tc).namedViaCacheOrFlat
    );
  },

  // ======================================================================== //

  /**
   * E.g. "G♭"
   */
  get tonalCenterName() {
    return derived([this.noteSet, this.intervalSet], ([ns, is]) => 
      ns.rootNote(is.invertedChord?.inversion || 0).nameToUseForLabels
    )
  },

  // ======================================================================== //

  /**
   * The main text to display to the user that describes the current interval
   * set.
   */
  get title() {
    return derived([this.intervalSet, this.tonalCenterName], ([is, tcn]) => 
      `${tcn} ${is.name.full}`
    );
  },

  // ======================================================================== //

  get transposeTarget() {
    return derived(
      [
        this.tonalCenter,
        this.noteSet,
        this.keyboardRotator.currentDetent
      ],
      ([tonalCenter, noteSet, currentDetent]) => {
        const noteId = Scalar.wrapToOctave(tonalCenter - currentDetent);
        const note = noteSet.notes.find(n => n.id === noteId)
          ?? new Note(noteId);
        return note.guaranteedName.unicode;
      }
    ) 
  },
  
  // ======================================================================== //
  
  get modeShiftTarget() {
    return derived([this.intervalSet, this.scaleRotator.currentDetent],
      ([intervalSet, currentDetent]) =>
      intervalSet.shift(currentDetent).analyzed.name.full
    )
  },
  
  // ======================================================================== //

  scaleRotator: new RotationController(),

  keyboardRotator: new RotationController(),

  get scaleIsRotating() {
    return this.scaleRotator.isRotating;
  },
  
  get keyboardIsRotating() {
    return this.keyboardRotator.isRotating;
  },

  get somethingIsRotating() {
    return derived([this.scaleIsRotating, this.keyboardIsRotating],
      ([s, k]) => s || k
    );
  },

  // ======================================================================== //

  audioContext: (() => {
    const opts: AudioContextOptions = {
      latencyHint: "interactive",
      sampleRate: 12000,
    };
    if ('webkitAudioContext' in window) {
      // @ts-ignore because ts doesn't know about Safari's vendor prefix.
      return new webkitAudioContext(opts) as AudioContext;
    }
    return new AudioContext(opts);
  })(),

  // ======================================================================== //

  /**
   * Keep a list of KeyElements so that the Keyboard component (note we only have
   * one of them, which this structure enforces) knows what all the keys are
   * that are associated with it.
   */
  keyElements: (() => {
    const {subscribe, update} = writable([] as KeyElement[]);

    return {
      subscribe,

      /**
       * Add a new KeyElement to the registry of KeyElements.
       */
      register: (keyElement: KeyElement | null | undefined) => {
        if (!keyElement) {return}
        update(keyElements => [...keyElements, keyElement]);
      },
      
      /**
       * Remove a KeyElement from the registry.
       */
      unregister: (keyElement: KeyElement | null | undefined) => {
        if (!keyElement) {return}
        update(keyElements => keyElements.filter(ke => ke !== keyElement));
      },
    };
  })(),

  lightingController: new LightingController(),

  /**
   * Return a helper function that makes it easier for components to create
   * KeyControllers. It's easier because those components don't need to import
   * a bunch of stuff if they use this function.
   */
  get createKeyController() {
    return (props: 
      {createVoice?: (audioContext: AudioContext) => Voice} &
      ( { pitches: Pitch[] } | { notes: Note[] } )
    ) => {
      const voice = props.createVoice
        ? props.createVoice(this.audioContext)
        : new ShepardVoice({audioContext: this.audioContext});
      return new KeyController({
        ...props,
        voice,
        lightingController: this.lightingController,
        notesPlaying: this.notesPlaying,
      }); 
    }
  }

});

export type Store = ReturnType<typeof createStore>;

export const storeContextKey = {};

export const setStoreInContext = (
  initialTonalCenter: number,
  initialIntervalSet: IntervalSet,
) => setContext(storeContextKey, 
  createStore(initialTonalCenter, initialIntervalSet)
);

export const getStore = () => getContext<Store>(storeContextKey);
