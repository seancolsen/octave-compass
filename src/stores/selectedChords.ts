import { writable } from 'svelte/store';
import { ChordSet } from '../Utils/Music/ChordSet';

/**
 * Which chords are displayed to the user.
 */
export const selectedChords = writable(ChordSet.fromDefaultChords);
