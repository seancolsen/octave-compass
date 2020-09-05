import { writable } from 'svelte/store';
import { IntervalSet } from '../Utils/Music/IntervalSet';

/**
 * Which intervals are enabled/disabled.
 */
export const intervalSet = writable(IntervalSet.fromBinary(2741));
