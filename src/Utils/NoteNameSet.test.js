import NoteNameSet from './NoteNameSet';
import NoteName from './NoteName';

const cNatural = new NoteName('C', 'natural');
const cSharp = new NoteName('C', 'sharp');
const dFlat = new NoteName('D', 'flat');
const dSharp = new NoteName('D', 'sharp');
const gDoubleSharp = new NoteName('G', 'doubleSharp');

test('duplicateBaseNamesDemerits positive', () => {
  const set = new NoteNameSet([cNatural, cSharp]);
  expect(set.duplicateBaseNamesDemerits).toBeGreaterThan(0);
});

test('duplicateBaseNamesDemerits zero', () => {
  const set = new NoteNameSet([cNatural, dFlat]);
  expect(set.duplicateBaseNamesDemerits).toBe(0);
});

test('mixOfSharpsAndFlatsDemerits positive', () => {
  const set = new NoteNameSet([dFlat, dSharp]);
  expect(set.mixOfSharpsAndFlatsDemerits).toBeGreaterThan(0);
});

test('mixOfSharpsAndFlatsDemerits zero', () => {
  const sharps = new NoteNameSet([cSharp, dSharp]);
  expect(sharps.mixOfSharpsAndFlatsDemerits).toBe(0);
  const sharpAndDoubleSharp = new NoteNameSet([cSharp, gDoubleSharp]);
  expect(sharpAndDoubleSharp.mixOfSharpsAndFlatsDemerits).toBe(0);
  const naturalAndSharp = new NoteNameSet([cNatural, dSharp]);
  expect(naturalAndSharp.mixOfSharpsAndFlatsDemerits).toBe(0);
});
