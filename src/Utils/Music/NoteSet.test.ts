import { NoteSet } from './NoteSet';
import { IntervalSet } from "./IntervalSet";
import { Note } from "./Note";

test('chromatic', () => {
  expect(NoteSet.chromatic.notes.length).toBe(12);
});

test('fromIntervalSet basic', () => {
  const intervalSet = IntervalSet.fromBinary(0b101010110101);
  const rotation = 0;
  const noteSet = NoteSet.fromIntervalSetAndTonalCenter(intervalSet, -rotation);
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
  const intervalSet = IntervalSet.fromBinary(0b101010110101);
  const rotation = 2;
  const noteSet = NoteSet.fromIntervalSetAndTonalCenter(intervalSet, -rotation);
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
  const intervalSet = IntervalSet.fromBinary(0b000010010001);
  const rotation = 0;
  const noteSet = NoteSet.fromIntervalSetAndTonalCenter(intervalSet, -rotation);
  expect(noteSet.possibleModifiersForEachNoteName).toEqual([
    ['natural', 'sharp', 'doubleFlat'],
    ['natural', 'flat', 'doubleSharp'],
    ['natural', 'doubleSharp', 'doubleFlat'],
  ]);
});

test('possibleNoteNameSets small', () => {
  const intervalSet = IntervalSet.fromBinary(0b000010000001);
  const rotation = 0;
  const noteSet = NoteSet.fromIntervalSetAndTonalCenter(intervalSet, -rotation);
  const sets = noteSet.possibleNoteNameSets;
  expect(sets.length).toBe(9);
});

test('possibleNoteNameSets large', () => {
  const intervalSet = IntervalSet.fromBinary(0b101010110101);
  const rotation = 0;
  const noteSet = NoteSet.fromIntervalSetAndTonalCenter(intervalSet, -rotation);
  const sets = noteSet.possibleNoteNameSets;
  expect(sets.length).toBe(2187);
});

test('named C major scale', () => {
  const intervalSet = IntervalSet.fromBinary(0b101010110101);
  const rotation = 0;
  const noteSet = NoteSet.fromIntervalSetAndTonalCenter(intervalSet, -rotation);
  const names = noteSet.namedViaBruteForce.nameSet!.noteNames;
  expect(names.map(n => n.unicode))
    .toEqual(['C', 'D', 'E', 'F', 'G', 'A', 'B']);
});

test('named complex scale', () => {
  const intervalSet = IntervalSet.fromBinary(0b010111001101);
  const rotation = -1;
  const noteSet = NoteSet.fromIntervalSetAndTonalCenter(intervalSet, -rotation);
  const names = noteSet.namedViaBruteForce.nameSet!.noteNames;
  expect(names.map(n => n.unicode))
    .toEqual(['C♯', 'D♯', 'E', 'F𝄪', 'G♯', 'A', 'B']);
});

test('note names are stored within the notes', () => {
  const intervalSet = IntervalSet.fromBinary(0b000010010001);
  const rotation = 0;
  const noteSet = NoteSet.fromIntervalSetAndTonalCenter(intervalSet, -rotation);
  expect(noteSet.namedViaBruteForce.notes.map(note => note.name!.unicode))
    .toEqual(['C', 'E', 'G']);
});

test('toIntervalSet no rotation', () => {
  const binary = 0b000010010001;
  const intervalSet = IntervalSet.fromBinary(binary);
  const rotation = 0;
  const noteSet = NoteSet.fromIntervalSetAndTonalCenter(intervalSet, -rotation);
  expect(noteSet.toIntervalSet().binary).toBe(binary);
});

test('toIntervalSet with rotation', () => {
  const binary = 0b000010010001;
  const intervalSet = IntervalSet.fromBinary(binary);
  const rotation = -2;
  const noteSet = NoteSet.fromIntervalSetAndTonalCenter(intervalSet, -rotation);
  expect(noteSet.toIntervalSet(-2).binary).toBe(binary);
});

test('directionallyNamed', () => {
  expect(
    NoteSet.chromatic.directionallyNamed('flat').notes
    .map(note => note.name!.spelledOut)
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
  const intervalSet = IntervalSet.fromBinary(0b101010110101);
  const rotation = 2; // B flat major scale
  const noteSet = NoteSet.fromIntervalSetAndTonalCenter(intervalSet, -rotation);
  expect(noteSet.namedViaBruteForce.compliment.notes.map(note => note.name!.spelledOut))
    .toEqual(['D flat', 'E', 'G flat', 'A flat', 'B']);
});

test('Squash bug with note naming', () => {
  const noteSet = new NoteSet([
    new Note(0),
    new Note(4),
    new Note(5),
    new Note(6),
    new Note(7),
    new Note(9),
    new Note(11),
  ]);
  const value = noteSet.namedViaBruteForce.notes[1].namesToUseForLabels[0];
  expect(value.unicode).toBeDefined();
});

test('tonalCenterName B flat major', () => {
  const intervalSet = IntervalSet.fromBinary(0b101010110101);
  const rotation = 2;
  const noteSet = NoteSet.fromIntervalSetAndTonalCenter(intervalSet, -rotation)
    .namedViaBruteForce;
  expect(noteSet.tonalCenterName).toBe('B♭');
});

test('tonalCenterName C# chromatic', () => {
  const intervalSet = IntervalSet.chromatic;
  const rotation = -1;
  const noteSet = NoteSet.fromIntervalSetAndTonalCenter(intervalSet, -rotation);
  expect(noteSet.tonalCenterName).toBe('C♯/D♭');
});
