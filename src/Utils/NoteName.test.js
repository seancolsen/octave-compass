import NoteName from './NoteName';
import {musicTheory} from "../Data/musicTheory";
import Note from "./Note";

const noteC = new Note(musicTheory.notes[0]);
const noteDFlat = new Note(musicTheory.notes[1]);
const noteG = new Note(musicTheory.notes[7]);

const cNatural = noteC.namedAs('natural');
const cSharp = noteDFlat.namedAs('sharp');
const dFlat = noteDFlat.namedAs('flat');
const fDoubleSharp = noteG.namedAs('doubleSharp');
const dDoubleFlat = noteC.namedAs('doubleFlat');

test('baseName', () => {
  expect(cNatural.baseName).toBe('C');
  expect(cSharp.baseName).toBe('C');
  expect(dDoubleFlat.baseName).toBe('D');
  expect(fDoubleSharp.baseName).toBe('F');
});

test('unicode', () => {
  expect(dFlat.unicode).toBe('D♭');
});

test('direction', () => {
  expect(dFlat.direction).toBe('flat');
  expect(cNatural.direction).toBe('none');
  expect(cSharp.direction).toBe('sharp');
  expect(fDoubleSharp.direction).toBe('sharp');
  expect(dDoubleFlat.direction).toBe('flat');
});
