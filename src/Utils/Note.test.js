import Note from './Note';
import {musicTheory} from "../Data/musicTheory";

const noteC = new Note(musicTheory.notes[0]);
const noteCSharp = new Note(musicTheory.notes[1]);

test('color', () => {
  expect(noteC.color).toBe('white');
  expect(noteCSharp.color).toBe('black');
});