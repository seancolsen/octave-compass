import Note from './Note';

const noteC = new Note(0);
const noteCSharp = new Note(1);

test('constructor', () => {
  expect(noteC).toBeDefined();
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
