import NoteSet from './NoteSet';
import IntervalSet from "./IntervalSet";

test('chromatic', () => {
  expect(NoteSet.chromatic.notes.length).toBe(12);
});

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

test('possibleModifiersForEachNamedNote', () => {
  const intervalSet = new IntervalSet(0b000010010001);
  const rotation = 0;
  const noteSet = NoteSet.fromIntervalSet(intervalSet, rotation);
  expect(noteSet.possibleModifiersForEachNamedNote).toEqual([
    ['natural', 'sharp', 'doubleFlat'],
    ['natural', 'flat', 'doubleSharp'],
    ['natural', 'doubleSharp', 'doubleFlat'],
  ]);
});

test('possibleNamedNoteSets small', () => {
  const intervalSet = new IntervalSet(0b000010000001);
  const rotation = 0;
  const noteSet = NoteSet.fromIntervalSet(intervalSet, rotation);
  const sets = noteSet.possibleNamedNoteSets;
  expect(sets.length).toBe(9);
});

test('possibleNamedNoteSets large', () => {
  const intervalSet = new IntervalSet(0b101010110101);
  const rotation = 0;
  const noteSet = NoteSet.fromIntervalSet(intervalSet, rotation);
  const sets = noteSet.possibleNamedNoteSets;
  expect(sets.length).toBe(2187);
});

test('named C major scale', () => {
  const intervalSet = new IntervalSet(0b101010110101);
  const rotation = 0;
  const noteSet = NoteSet.fromIntervalSet(intervalSet, rotation);
  const names = noteSet.named.names;
  expect(names.map(n => n.unicode))
    .toEqual(['C', 'D', 'E', 'F', 'G', 'A', 'B']);
});

test('named C major scale', () => {
  const intervalSet = new IntervalSet(0b101010110101);
  const rotation = 0;
  const noteSet = NoteSet.fromIntervalSet(intervalSet, rotation);
  const names = noteSet.named.names;
  expect(names.map(n => n.unicode))
    .toEqual(['C', 'D', 'E', 'F', 'G', 'A', 'B']);
});

test('named complex scale', () => {
  const intervalSet = new IntervalSet(0b010111001101);
  const rotation = -1;
  const noteSet = NoteSet.fromIntervalSet(intervalSet, rotation);
  const names = noteSet.named.names;
  expect(names.map(n => n.unicode))
    .toEqual(['C♯', 'D♯', 'E', 'F𝄪', 'G♯', 'A', 'B']);
});
