import NoteNameSet from './NoteNameSet';
import NoteName from './NoteName';
import {musicTheory} from "../Data/musicTheory";
import Note from "./Note";

const noteC = new Note(musicTheory.notes[0]);
const noteDFlat = new Note(musicTheory.notes[1]);
const noteD = new Note(musicTheory.notes[2]);
const noteEFlat = new Note(musicTheory.notes[3]);
const noteE = new Note(musicTheory.notes[4]);
const noteF = new Note(musicTheory.notes[5]);
const noteGFlat = new Note(musicTheory.notes[6]);
const noteG = new Note(musicTheory.notes[7]);

const cNatural = noteC.namedAs('natural');
const cSharp = noteDFlat.namedAs('sharp');
const dFlat = noteDFlat.namedAs('flat');
const dSharp = noteEFlat.namedAs('sharp');
const eSharp = noteF.namedAs('sharp');
const eDoubleSharp = noteGFlat.namedAs('doubleSharp');
const fDoubleSharp = noteG.namedAs('doubleSharp');

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
  const sharpAndDoubleSharp = new NoteNameSet([cSharp, fDoubleSharp]);
  expect(sharpAndDoubleSharp.mixOfSharpsAndFlatsDemerits).toBe(0);
  const naturalAndSharp = new NoteNameSet([cNatural, dSharp]);
  expect(naturalAndSharp.mixOfSharpsAndFlatsDemerits).toBe(0);
});

test('accidentalInsteadOfNaturalDemerits positive', () => {
  const set = new NoteNameSet([cNatural, dFlat, dSharp, eSharp, fDoubleSharp]);
  expect(set.accidentalInsteadOfNaturalDemerits).toBeGreaterThan(0);
});

test('accidentalInsteadOfNaturalDemerits zero', () => {
  const set = new NoteNameSet([cNatural, dFlat, dSharp, eDoubleSharp]);
  expect(set.accidentalInsteadOfNaturalDemerits).toBe(0);
});

test('doubleModifierDemerits positive', () => {
  const set = new NoteNameSet([cNatural, dFlat, dSharp, eDoubleSharp]);
  expect(set.doubleModifierDemerits).toBeGreaterThan(0);
});

test('doubleModifierDemerits zero', () => {
  const set = new NoteNameSet([cNatural, dFlat, dSharp, eSharp]);
  expect(set.doubleModifierDemerits).toBe(0);
});
