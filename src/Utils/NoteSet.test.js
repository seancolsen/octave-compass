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
  expect(noteSet.notes[0].possibleNames.natural.baseName).toBe('C');
  expect(noteSet.notes[1].possibleNames.natural.baseName).toBe('D');
  expect(noteSet.notes[2].possibleNames.natural.baseName).toBe('E');
  expect(noteSet.notes[3].possibleNames.natural.baseName).toBe('F');
  expect(noteSet.notes[4].possibleNames.natural.baseName).toBe('G');
  expect(noteSet.notes[5].possibleNames.natural.baseName).toBe('A');
  expect(noteSet.notes[6].possibleNames.natural.baseName).toBe('B');
});

test('fromIntervalSet rotated', () => {
  const intervalSet = new IntervalSet(0b101010110101);
  const rotation = 2;
  const noteSet = NoteSet.fromIntervalSet(intervalSet, rotation);
  expect(noteSet.count).toBe(7);
  expect(noteSet.notes[0].possibleNames.flat.baseName).toBe('B');
  expect(noteSet.notes[1].possibleNames.natural.baseName).toBe('C');
  expect(noteSet.notes[2].possibleNames.natural.baseName).toBe('D');
  expect(noteSet.notes[3].possibleNames.flat.baseName).toBe('E');
  expect(noteSet.notes[4].possibleNames.natural.baseName).toBe('F');
  expect(noteSet.notes[5].possibleNames.natural.baseName).toBe('G');
  expect(noteSet.notes[6].possibleNames.natural.baseName).toBe('A');
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

test('named C major scale', () => {
  const intervalSet = new IntervalSet(0b101010110101);
  const rotation = 0;
  const noteSet = NoteSet.fromIntervalSet(intervalSet, rotation);
  const names = noteSet.named.nameSet.noteNames;
  expect(names.map(n => n.unicode))
    .toEqual(['C', 'D', 'E', 'F', 'G', 'A', 'B']);
});

test('named complex scale', () => {
  const intervalSet = new IntervalSet(0b010111001101);
  const rotation = -1;
  const noteSet = NoteSet.fromIntervalSet(intervalSet, rotation);
  const names = noteSet.named.nameSet.noteNames;
  expect(names.map(n => n.unicode))
    .toEqual(['C♯', 'D♯', 'E', 'F𝄪', 'G♯', 'A', 'B']);
});

test('note names are stored within the notes', () => {
  const intervalSet = new IntervalSet(0b000010010001);
  const rotation = 0;
  const noteSet = NoteSet.fromIntervalSet(intervalSet, rotation);
  expect(noteSet.named.notes.map(note => note.name.unicode))
    .toEqual(['C', 'E', 'G']);
});

test('toIntervalSet no rotation', () => {
  const binary = 0b000010010001;
  const intervalSet = new IntervalSet(binary);
  const rotation = 0;
  const noteSet = NoteSet.fromIntervalSet(intervalSet, rotation);
  expect(noteSet.toIntervalSet().binary).toBe(binary);
});

test('toIntervalSet with rotation', () => {
  const binary = 0b000010010001;
  const intervalSet = new IntervalSet(binary);
  const rotation = -2;
  const noteSet = NoteSet.fromIntervalSet(intervalSet, rotation);
  expect(noteSet.toIntervalSet(-2).binary).toBe(binary);
});

test('directionallyNamed', () => {
  expect(
    NoteSet.chromatic.directionallyNamed('flat').notes
    .map(note => note.name.ascii)
  ).toEqual([
    'C',
    'D flat',
    'D',
    'E flat',
    'E',
    'F',
    'G flat',
    'G',
    'A flat',
    'A',
    'B flat',
    'B'
  ]);
});

test('compliment', () => {
  const intervalSet = new IntervalSet(0b101010110101);
  const rotation = 2; // B flat major scale
  const noteSet = NoteSet.fromIntervalSet(intervalSet, rotation);
  expect(noteSet.named.compliment.notes.map(note => note.name.ascii))
    .toEqual(['D flat', 'E', 'G flat', 'A flat', 'B']);
});
