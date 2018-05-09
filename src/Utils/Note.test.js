import Note from './Note';
import {musicTheory} from "../Data/musicTheory";

const cData = musicTheory.notes[0];
const cSharpData = musicTheory.notes[1];

test('constructor', () => {
  let n = new Note(cSharpData);
  expect(n.sharpName).toBe('C sharp');
  expect(n.flatName).toBe('D flat');
});

test('color', () => {
  let c = new Note(cData);
  let cSharp = new Note(cSharpData);
  expect(c.color).toBe('white');
  expect(cSharp.color).toBe('black');
});

test('name', () => {
  let c = new Note(cData);
  let cSharp = new Note(cSharpData);
  expect(c.name('sharp')).toBe('C');
  expect(c.name('flat')).toBe('C');
  expect(c.name('both')).toBe('C');
  expect(cSharp.name('sharp')).toBe('C♯');
  expect(cSharp.name('flat')).toBe('D♭');
  expect(cSharp.name('both')).toEqual(['C♯', 'D♭']);
});

test('baseName', () => {
  let cSharp = new Note(cSharpData);
  expect(cSharp.baseName('sharp')).toBe('C');
  expect(cSharp.baseName('flat')).toBe('D');
  expect(cSharp.baseName('both')).toBe('C sharp / D flat');
});
