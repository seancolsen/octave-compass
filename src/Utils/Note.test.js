import Note from './Note';
import {musicTheory} from "../Data/musicTheory";

const noteC = new Note(musicTheory.notes[0]);
const noteCSharp = new Note(musicTheory.notes[1]);

test('color', () => {
  expect(noteC.color).toBe('white');
  expect(noteCSharp.color).toBe('black');
});

test('namedAs', () => {
  expect(noteC.namedAs('natural').baseName).toBe('C');
  expect(noteC.namedAs('sharp').baseName).toBe('B');
  expect(noteC.namedAs('doubleFlat').baseName).toBe('D');
});
