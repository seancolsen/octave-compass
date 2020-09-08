import { IntervalSet } from './Utils/Music/IntervalSet';
import { ChordSet } from './Utils/Music/ChordSet';
import { Scalar } from './Utils/Math/Scalar';
import { IntervalSetFactory } from './Utils/Music/IntervalSetFactory';
import { Chord } from './Utils/Music/Chord';
import { NoteSet } from './Utils/Music/NoteSet';
import { Scale } from './Utils/Music/Scale';
import { OrdinalChord } from './Utils/Music/OrdinalChord';

export interface StoreInitialValues {
  tonalCenter: number,
  intervalSet: IntervalSet,
};

/**
 * Sometimes the initial values come from the URL and can be anything. But when
 * we don't have those values supplied from the URL (e.g. when the user goes to
 * the site without any specific path or during automated tests where we don't
 * have the context object) then we'll use these values as default.
 */
const defaultInitialValues: StoreInitialValues = {
  tonalCenter: 0,
  intervalSet: IntervalSet.fromBinary(2741),
}

const createStore = (initialValues: StoreInitialValues, audio: any) => ({
 

  // /**
  //  * Generate audio from the given notes!
  //  */
  // playNotes(noteIds: number[]) {
  //   const pitches = this.pitchSet.pitches.filter(pitch =>
  //     noteIds.includes(pitch.note.id)
  //   );
  //   audio.playPitches(pitches);
  // },

  // /**
  //  * Generate audio from the given ordinals!
  //  */
  // playIntervals(ordinals: number[]) {
  //   const notes = ordinals.map(ordinal =>
  //     Scalar.wrapToOctave(ordinal + this.tonalCenter)
  //   );
  //   this.playNotes(notes);
  // },
  
  // /**
  //  * Generate audio of a chord within the scale.
  //  */
  // playOrdinalChord(ordinalChord: OrdinalChord) {
  //   this.playIntervals(ordinalChord.intervalSet.ordinals);
  // },



}); // createStore
