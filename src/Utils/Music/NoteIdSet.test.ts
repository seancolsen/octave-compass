import { NoteIdSet } from "./NoteIdSet";

// const ordinalsToOrdinals = (o: number[], tonalCenter: number) =>
//   NoteIdSet.fromArray(o).toIntervalSet(tonalCenter).ordinals;

const placedChords = (o: number[]) => NoteIdSet.fromArray(o) 
  .placedChords.map(pc => [pc.chord.abbreviation, pc.rootNoteId]);

// test('toIntervalSet', () => {
//   expect(ordinalsToOrdinals([0, 4, 7], 0)).toEqual([0, 4, 7]);
//   expect(ordinalsToOrdinals([7, 4, 0], 0)).toEqual([0, 4, 7]);
//   expect(ordinalsToOrdinals([0, 4, 7], 1)).toEqual([3, 6, 11]);
//   expect(ordinalsToOrdinals([0, 4, 7], 4)).toEqual([0, 3, 8]);
//   expect(ordinalsToOrdinals([0, 4, 7], 7)).toEqual([0, 5, 9]);
//   expect(ordinalsToOrdinals([11, 3, 6], 11)).toEqual([0, 4, 7]);
//   expect(ordinalsToOrdinals([11, 3, 6], 0)).toEqual([3, 6, 11]);
//   expect(ordinalsToOrdinals([11, 3, 6], 3)).toEqual([0, 3, 8]);
// });

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
