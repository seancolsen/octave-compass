import { Pitch } from "./Pitch";
import { NoteSet } from "./NoteSet";

export class PitchSet {

  noteSet: NoteSet;

  pitches: Pitch[] = [];

  constructor(noteSet: NoteSet, startingOctave: number) {
    this.noteSet = noteSet;
    let octave = startingOctave;
    let previousNoteId: number | null = null;
    this.noteSet.notes.forEach(note => {
      if (previousNoteId && note.id < previousNoteId) {
        // (When we have wraped around the octave)
        octave++;
      }
      this.pitches.push(new Pitch(note, octave));
      previousNoteId = note.id;
    });
  }

  /**
   * Return a new PitchSet containing all the pitches within this octave that
   * this pitch set does not contain.
   */
  get compliment(): PitchSet {
    const startingOctave = this.pitches[0].octave;
    return this.noteSet.compliment.pitchSetStartingFrom(startingOctave);
  }

}