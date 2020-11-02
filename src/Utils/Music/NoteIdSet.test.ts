import { NoteIdSet } from "./NoteIdSet";

const placedChords = (o: number[]) => NoteIdSet.fromArray(o) 
  .placedChords.map(pc => [pc.chord.abbreviation, pc.rootNoteId]);

test('placedChords', () => {
  expect(placedChords([])).toEqual([]);
  expect(placedChords([0])).toEqual([]);
  expect(placedChords([0, 1, 2])).toEqual([]);
  expect(placedChords([0, 1, 2, 3, 4, 5])).toEqual([]);
  expect(placedChords([0, 4, 7])).toEqual([['Maj', 0]]);
  expect(placedChords([7, 4, 0])).toEqual([['Maj', 0]]);
  expect(placedChords([0, 3, 8])).toEqual([['Maj', 8]]);
  expect(placedChords([0, 5, 9])).toEqual([['Maj', 5]]);
  expect(placedChords([11, 4, 8])).toEqual([['Maj', 4]]);
  expect(placedChords([0, 5, 7])).toEqual([['Sus4', 0], ['Sus2', 5]]);
});
