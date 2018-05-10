import Note from './Note';

const noteC = new Note(0);
const noteCSharp = new Note(1);

test('constructor', () => {
  expect(noteC).toBeDefined();
});

test('hasName', () => {
  expect(noteC.hasName('natural')).toBe(true);
  expect(noteCSharp.hasName('natural')).toBe(false);
});

test('color', () => {
  expect(noteC.color).toBe('white');
  expect(noteCSharp.color).toBe('black');
});

test('namedAs', () => {
  expect(noteC.namedAs('natural').baseName).toBe('C');
  expect(noteC.namedAs('sharp').baseName).toBe('B');
  expect(noteC.namedAs('doubleFlat').baseName).toBe('D');
});

test('namedToMatch', () => {
  expect(noteC.namedToMatch('natural').ascii).toBe('C');
  expect(noteC.namedToMatch('sharp').ascii).toBe('C');
  expect(noteC.namedToMatch('flat').ascii).toBe('C');
  expect(noteCSharp.namedToMatch('natural')).toBeNull();
  expect(noteCSharp.namedToMatch('sharp').ascii).toBe('C sharp');
  expect(noteCSharp.namedToMatch('flat').ascii).toBe('D flat');
});
