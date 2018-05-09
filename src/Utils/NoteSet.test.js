import NoteSet from './NoteSet';
import IntervalSet from "./IntervalSet";

test('fromIntervalSet basic', () => {
  const intervalSet = new IntervalSet(0b101010110101);
  const rotation = 0;
  const noteSet = NoteSet.fromIntervalSet(intervalSet, rotation);
  expect(noteSet.count).toBe(7);
  expect(noteSet.notes[0].flatName).toBe('C');
  expect(noteSet.notes[1].flatName).toBe('D');
  expect(noteSet.notes[2].flatName).toBe('E');
  expect(noteSet.notes[3].flatName).toBe('F');
  expect(noteSet.notes[4].flatName).toBe('G');
  expect(noteSet.notes[5].flatName).toBe('A');
  expect(noteSet.notes[6].flatName).toBe('B');
});

test('fromIntervalSet rotated', () => {
  const intervalSet = new IntervalSet(0b101010110101);
  const rotation = 2;
  const noteSet = NoteSet.fromIntervalSet(intervalSet, rotation);
  expect(noteSet.count).toBe(7);
  expect(noteSet.notes[0].flatName).toBe('B flat');
  expect(noteSet.notes[1].flatName).toBe('C');
  expect(noteSet.notes[2].flatName).toBe('D');
  expect(noteSet.notes[3].flatName).toBe('E flat');
  expect(noteSet.notes[4].flatName).toBe('F');
  expect(noteSet.notes[5].flatName).toBe('G');
  expect(noteSet.notes[6].flatName).toBe('A');
});
