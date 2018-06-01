import Pitch from "Utils/Music/Pitch";

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

  /**
   * Return a new PitchSet containing all the pitches within this octave that
   * this pitch set does not contain.
   *
   * @return {PitchSet}
   */
  get compliment() {
    const startingOctave = this.pitches[0].octave;
    return this.noteSet.compliment.pitchSetStartingFrom(startingOctave);
  }

}