import { writable } from 'svelte/store';

/**
 * The note at the top of the wheel, as an integer. 0 means C, 1 means C
 * and so on. 
 */
export const tonalCenter = writable(0);
