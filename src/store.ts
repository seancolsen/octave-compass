import { writable, derived } from 'svelte/store';
import { IntervalSet } from './Utils/Music/IntervalSet';
import { IntervalSetFactory } from './Utils/Music/IntervalSetFactory';
import { ChordSet } from './Utils/Music/ChordSet';
import { NoteSet } from './Utils/Music/NoteSet';
import { Chord } from './Utils/Music/Chord';
import { Scale } from './Utils/Music/Scale';
import { Scalar } from './Utils/Math/Scalar';
import type { KeyElement } from './components/Keyboard/KeyController';
import { setContext, getContext } from 'svelte';
import { LightingController } from './components/Lighting/LightingController';

/**
 * ABOUT THIS FILE:
 *
 * - The `====` line comments serve to delineate stores:rom one
 *   another.
 * - When one store needs several intermediate variables before I:rap
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
  editVsPlay: writable(1),

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

    /**
     * We run any newly computed IntervalSet through this function in order to
     * determine which Scale or Chord the new IntervalSet is. This has more of a
     * performance hit than just setting the interval set directly.
     */
    function smartUpdate(updater: (oldIntervalSet: IntervalSet) => IntervalSet) {
      update(is => IntervalSetFactory.fromIntervalSet(updater(is)));
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
      NoteSet.fromIntervalSetAndTonalCenter(is, tc).namedIfFeasible
    );
  },

  // ======================================================================== //

  /**
   * If the current interval set is a chord, then give the inversion of that
   * chord. If not, then give null.
   */
  get inversion() {
    return derived(this.intervalSet, intervalSet => 
      intervalSet instanceof Chord ? intervalSet.inversion : null
    );
  },

  // ======================================================================== //

  /**
   * E.g. "G♭"
   */
  get tonalCenterName() {
    return derived([this.noteSet, this.inversion],
      ([ns, i]) => ns.rootNote(i || 0).nameToUseForLabels
    )
  },

  // ======================================================================== //

  /**
   * The main text to display to the user that describes the current interval
   * set.
   */
  get title() {
    return derived([this.intervalSet, this.tonalCenterName],
      ([intervalSet, tonalCenterName]) => {
        const displayName = intervalSet.displayName;
        if (intervalSet instanceof Chord) {
          return `${tonalCenterName} ${displayName} chord`
        }
        else if (intervalSet instanceof Scale) {
          return `${tonalCenterName} ${displayName} Scale`;
        }
        else {
          return `${displayName} in ${tonalCenterName}`;
        }
      }
    )
  },

  // ======================================================================== //

  get alternateScaleNames() {
    return derived(this.intervalSet, is => 
      is instanceof Scale ? is.alternateNames : [] as string[]
    )
  },

  // ======================================================================== //

    /**
   * E.g. "1st inversion"
   */
  get inversionText() {
    return derived(this.inversion, inversion => {
      const ordinalAbbreviations = [
        '0th',
        '1st',
        '2nd',
        '3rd',
        '4th',
        '5th',
      ];
      return inversion
        ? ` (${ordinalAbbreviations[inversion]} inversion)`
        : undefined;
    })
  },

  // ======================================================================== //

  /**
   * True if we know the name of the current interval set.
   */
  get isNamed() {
    return derived(this.intervalSet, intervalSet => 
      intervalSet instanceof Chord || intervalSet instanceof Scale
    )
  },

  // ======================================================================== //

  audioContext: new AudioContext({
    latencyHint: "playback",
    sampleRate: 12000,
  }),

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
