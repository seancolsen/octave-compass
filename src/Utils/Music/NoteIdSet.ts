import { Chord } from "./Chord";
import { IntervalSet } from "./IntervalSet";

export interface PlacedChord {
  chord: Chord,
  rootNoteId: number,
}

/**
 * This is a lighter-weight version of NoteSet. It only stores note ID values
 * and doesn't deal at all with naming notes.
 */
export class NoteIdSet {

  noteIds: Set<number>;
  
  constructor(noteIds: Set<number> = new Set<number>()) {
    this.noteIds = new Set(noteIds);
  }

  static fromArray(noteIdsArray: number[] = []) {
    const noteIds = new Set<number>();
    noteIdsArray.forEach(id => noteIds.add(id));
    return new NoteIdSet(noteIds);
  }

  add(noteIds: number[] = []) {
    const result = new Set(this.noteIds);
    noteIds.forEach(id => result.add(id));
    return new NoteIdSet(result);
  }

  delete(noteIds: number[] = []) {
    const result = new Set(this.noteIds);
    noteIds.forEach(id => result.delete(id));
    return new NoteIdSet(result);
  }

  get placedChords() {
    // For performance, give up if we don't have between 3 and 5 notes
    if (this.noteIds.size < 3 || this.noteIds.size > 5) {
      return [];
    }
    let placedChords = [] as PlacedChord[];
    const intervalSet = IntervalSet.fromOrdinals([...this.noteIds]);
    this.noteIds.forEach(id => {
      try {
        const chord = Chord.fromBinary(intervalSet.shift(-id).binary);
        placedChords.push({chord, rootNoteId: id});
      }
      catch { }
    });
    return placedChords;
  }

}
