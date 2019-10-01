import { Note } from "./Note";

const noteC = new Note(0);
const noteDFlat = new Note(1);
const noteG = new Note(7);
const noteB = new Note(11);

const cNatural = noteC.getNameUsing('natural');
const cSharp = noteDFlat.getNameUsing('sharp');
const dFlat = noteDFlat.getNameUsing('flat');
const fDoubleSharp = noteG.getNameUsing('doubleSharp');
const dDoubleFlat = noteC.getNameUsing('doubleFlat');
const bSharp = noteC.getNameUsing('sharp');
const bDoubleSharp = noteDFlat.getNameUsing('doubleSharp');
const cFlat = noteB.getNameUsing('flat');

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

test('spelledOut', () => {
  expect(cNatural.spelledOut).toBe('C');
  expect(dFlat.spelledOut).toBe('D flat');
  expect(dDoubleFlat.spelledOut).toBe('D double flat');
});

test('ascii', () => {
  expect(cNatural.ascii).toBe('C');
  expect(dFlat.ascii).toBe('Db');
  expect(dDoubleFlat.ascii).toBe('Dbb');
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

test('octaveBoundaryTraversal', () => {
  expect(bSharp.octaveBoundaryTraversal).toBe(-1);
  expect(bDoubleSharp.octaveBoundaryTraversal).toBe(-1);
  expect(cSharp.octaveBoundaryTraversal).toBe(0);
  expect(cFlat.octaveBoundaryTraversal).toBe(1);
});
