import { Note } from './Note';

const noteC = new Note(0);
const noteCSharp = new Note(1);

test('constructor', () => {
  expect(noteC).toBeDefined();
});

test('canBeNamedAs', () => {
  expect(noteC.canBeNamedAs('natural')).toBe(true);
  expect(noteCSharp.canBeNamedAs('natural')).toBe(false);
});

test('color', () => {
  expect(noteC.color).toBe('white');
  expect(noteCSharp.color).toBe('black');
});

test('getNameUsing', () => {
  expect(noteC.getNameUsing('natural').baseName).toBe('C');
  expect(noteC.getNameUsing('sharp').baseName).toBe('B');
  expect(noteC.getNameUsing('doubleFlat').baseName).toBe('D');
});

test('getNameToMatch', () => {
  expect(noteC.getNameToMatch('natural')!.spelledOut).toBe('C');
  expect(noteC.getNameToMatch('sharp')!.spelledOut).toBe('C');
  expect(noteC.getNameToMatch('flat')!.spelledOut).toBe('C');
  expect(noteCSharp.getNameToMatch('natural')).toBeNull();
  expect(noteCSharp.getNameToMatch('sharp')!.spelledOut).toBe('C sharp');
  expect(noteCSharp.getNameToMatch('flat')!.spelledOut).toBe('D flat');
});

test('namedToMatch', () => {
  expect(noteC.namedToMatch('natural').name!.spelledOut).toBe('C');
  expect(noteC.namedToMatch('sharp').name!.spelledOut).toBe('C');
  expect(noteC.namedToMatch('flat').name!.spelledOut).toBe('C');
  expect(noteCSharp.namedToMatch('natural').name).toBeUndefined();
  expect(noteCSharp.namedToMatch('sharp').name!.spelledOut).toBe('C sharp');
  expect(noteCSharp.namedToMatch('flat').name!.spelledOut).toBe('D flat');
});

test('namedUsing', () => {
  expect(noteC.namedUsing('natural').name!.spelledOut).toBe('C');
  expect(noteC.namedUsing('sharp').name!.spelledOut).toBe('B sharp');
});
