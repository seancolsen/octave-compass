import NamedNote from './NamedNote';
import {musicTheory} from "../Data/musicTheory";
import Note from "./Note";

const noteC = new Note(0);
const noteDFlat = new Note(1);
const noteG = new Note(7);

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
  expect(dDoubleFlat.unicode).toBe('D𝄫');
});

test('direction', () => {
  expect(dFlat.direction).toBe('flat');
  expect(cNatural.direction).toBe('none');
  expect(cSharp.direction).toBe('sharp');
  expect(fDoubleSharp.direction).toBe('sharp');
  expect(dDoubleFlat.direction).toBe('flat');
});

test('isDouble', () => {
  expect(cNatural.isDouble).toBe(false);
  expect(cSharp.isDouble).toBe(false);
  expect(dFlat.isDouble).toBe(false);
  expect(fDoubleSharp.isDouble).toBe(true);
  expect(dDoubleFlat.isDouble).toBe(true);
});
