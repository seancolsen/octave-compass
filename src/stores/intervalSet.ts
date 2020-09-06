import { writable } from 'svelte/store';
import { IntervalSet } from '../Utils/Music/IntervalSet';
import { IntervalSetFactory } from '../Utils/Music/IntervalSetFactory';


const {subscribe, set, update} = writable(IntervalSet.fromBinary(2741));

/**
 * We run any newly computed IntervalSet through this
 * function in order to determine which Scale or Chord the new IntervalSet is.
 * This has more of a performance hit than just setting the interval set
 * directly.
 */
function smartUpdate(updater: (oldIntervalSet: IntervalSet) => IntervalSet) {
  update(is => IntervalSetFactory.fromIntervalSet(updater(is)));
}

export const intervalSet = {
  subscribe,
  set,
  update,
  smartUpdate,

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
