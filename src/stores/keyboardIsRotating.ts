import { writable } from 'svelte/store';

/**
 * True when the user is manipulating the radial keyboard.
 * 
 * This store value is redundant with the value stored in the Rotator
 * component, but this is intentional for performance reasons because we don't
 * want to re-render the Wheel component as frequently as the Rotator
 * component.
 */
export const keyboardIsRotating = writable(false);
