import Pitch from "./Pitch";

export default class PitchSet {

  /**
   * @type {NoteSet}
   */
  noteSet;

  /**
   * @type {Pitch[]}
   */
  pitches = [];

  constructor(noteSet, startingOctave) {
    this.noteSet = noteSet;
    let octave = startingOctave;
    let previousNoteId = null;
    this.noteSet.notes.forEach(note => {
      if (note.id < previousNoteId) {
        octave++;
      }
      this.pitches.push(new Pitch(note, octave));
      previousNoteId = note.id;
    });
  }

}
