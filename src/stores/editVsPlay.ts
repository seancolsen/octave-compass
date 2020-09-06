import { writable } from 'svelte/store';

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
