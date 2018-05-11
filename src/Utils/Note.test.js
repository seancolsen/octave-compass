import Note from './Note';

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
  expect(noteC.getNameToMatch('natural').ascii).toBe('C');
  expect(noteC.getNameToMatch('sharp').ascii).toBe('C');
  expect(noteC.getNameToMatch('flat').ascii).toBe('C');
  expect(noteCSharp.getNameToMatch('natural')).toBeNull();
  expect(noteCSharp.getNameToMatch('sharp').ascii).toBe('C sharp');
  expect(noteCSharp.getNameToMatch('flat').ascii).toBe('D flat');
});
