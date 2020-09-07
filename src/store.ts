import { writable } from 'svelte/store';
import { IntervalSet } from './Utils/Music/IntervalSet';
import { IntervalSetFactory } from './Utils/Music/IntervalSetFactory';
import { ChordSet } from './Utils/Music/ChordSet';

/**
 * ABOUT THIS FILE:
 *
 * - The `====` line comments serve to delineate exported stores from one
 *   another.
 * - When one store needs several intermediate variables before export, I wrap
 *   it in an IIFE so that those variables can have their own scope.
 *
 * Originally, I used separate files for all these stores, which is an approach
 * that I still think has some merit. But in the end I settled on putting
 * everything into one file since it makes imports easier and derived stores
 * easier.
 *
 */

// ========================================================================== //

/**
 * A value of 0 means "Edit". When edit is enabled, the user can rotate the
 * scale and keyboard as well as toggle intervals on/off.
 * 
 * A value of 1 means "Play". When play is enabled, the user can play sounds.
 * 
 * Values in between 0 and 1 mean that the app is transitioning between states
 * and that no interaction should be possible. 
 */
export const editVsPlay = writable(1); 

// ========================================================================== //

/**
 * Which intervals are enabled.
 */
export const intervalSet = (() => {
  const {subscribe, update} = writable(IntervalSet.fromBinary(2741));

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
  
})();

// ========================================================================== //

/**
 * The note at the top of the wheel, as an integer. 0 means C, 1 means C
 * and so on. 
 */
export const tonalCenter = writable(0);

// ========================================================================== //

/**
 * Which chords are displayed to the user.
 */
export const selectedChords = writable(ChordSet.fromDefaultChords);

// ========================================================================== //

/**
 * True when the user is manipulating the radial keyboard.
 * 
 * This store value is redundant with the value stored in the Rotator
 * component, but this is intentional for performance reasons because we don't
 * want to re-render the Wheel component as frequently as the Rotator
 * component.
 */
export const keyboardIsRotating = writable(false);

// ========================================================================== //

/**
 * True when the user is manipulating the scale polygon.
 * 
 * This store value is redundant with the value stored in the Rotator
 * component, but this is intentional for performance reasons because we don't
 * want to re-render the Wheel component as frequently as the Rotator
 * component.
 */
export const scaleIsRotating = writable(false);