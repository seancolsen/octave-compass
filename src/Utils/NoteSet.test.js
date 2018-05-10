import NoteSet from './NoteSet';
import IntervalSet from "./IntervalSet";

test('fromIntervalSet basic', () => {
  const intervalSet = new IntervalSet(0b101010110101);
  const rotation = 0;
  const noteSet = NoteSet.fromIntervalSet(intervalSet, rotation);
  expect(noteSet.count).toBe(7);
  expect(noteSet.notes[0].names.natural.baseName).toBe('C');
  expect(noteSet.notes[1].names.natural.baseName).toBe('D');
  expect(noteSet.notes[2].names.natural.baseName).toBe('E');
  expect(noteSet.notes[3].names.natural.baseName).toBe('F');
  expect(noteSet.notes[4].names.natural.baseName).toBe('G');
  expect(noteSet.notes[5].names.natural.baseName).toBe('A');
  expect(noteSet.notes[6].names.natural.baseName).toBe('B');
});

test('fromIntervalSet rotated', () => {
  const intervalSet = new IntervalSet(0b101010110101);
  const rotation = 2;
  const noteSet = NoteSet.fromIntervalSet(intervalSet, rotation);
  expect(noteSet.count).toBe(7);
  expect(noteSet.notes[0].names.flat.baseName).toBe('B');
  expect(noteSet.notes[1].names.natural.baseName).toBe('C');
  expect(noteSet.notes[2].names.natural.baseName).toBe('D');
  expect(noteSet.notes[3].names.flat.baseName).toBe('E');
  expect(noteSet.notes[4].names.natural.baseName).toBe('F');
  expect(noteSet.notes[5].names.natural.baseName).toBe('G');
  expect(noteSet.notes[6].names.natural.baseName).toBe('A');
});

test('possibleModifiersForEachNoteName', () => {
  const intervalSet = new IntervalSet(0b000010010001);
  const rotation = 0;
  const noteSet = NoteSet.fromIntervalSet(intervalSet, rotation);
  expect(noteSet.possibleModifiersForEachNoteName).toEqual([
    ['natural', 'sharp', 'doubleFlat'],
    ['natural', 'flat', 'doubleSharp'],
    ['natural', 'doubleSharp', 'doubleFlat'],
  ]);
});

test('possibleNoteNameSets small', () => {
  const intervalSet = new IntervalSet(0b000010000001);
  const rotation = 0;
  const noteSet = NoteSet.fromIntervalSet(intervalSet, rotation);
  const sets = noteSet.possibleNoteNameSets;
  expect(sets.length).toBe(9);
});

test('possibleNoteNameSets large', () => {
  const intervalSet = new IntervalSet(0b101010110101);
  const rotation = 0;
  const noteSet = NoteSet.fromIntervalSet(intervalSet, rotation);
  const sets = noteSet.possibleNoteNameSets;
  expect(sets.length).toBe(2187);
});
