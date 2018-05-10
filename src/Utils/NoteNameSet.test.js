import NoteNameSet from './NoteNameSet';
import NoteName from './NoteName';
import {musicTheory} from "../Data/musicTheory";
import Note from "./Note";
import IntervalSet from "./IntervalSet";
import NoteSet from "./NoteSet";

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
const eDoubleFlat = noteD.namedAs('doubleFlat');
const dSharp = noteEFlat.namedAs('sharp');
const fFlat = noteE.namedAs('flat');
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

test('demerits positive', () => {
  const set = new NoteNameSet([cNatural, cSharp, dSharp, fFlat, eDoubleSharp]);
  expect(set.demerits).toBeGreaterThan(0);
});

test('demerits zero', () => {
  const set = new NoteNameSet([cNatural, dSharp]);
  expect(set.demerits).toBe(0);
});

test('fromModifiers simple', () => {
  const intervalSet = new IntervalSet(0b000010010001);
  const rotation = 0;
  const noteSet = NoteSet.fromIntervalSet(intervalSet, rotation);
  const noteNameSet = NoteNameSet.fromModifiers(noteSet, [
    'natural',
    'natural',
    'natural',
  ]);
  expect(noteNameSet.noteNames.length).toBe(3);
  expect(noteNameSet.noteNames[0].unicode).toBe('C');
  expect(noteNameSet.noteNames[1].unicode).toBe('E');
  expect(noteNameSet.noteNames[2].unicode).toBe('G');
});

test('fromModifiers complex', () => {
  const intervalSet = new IntervalSet(0b000010010001);
  const rotation = -4;
  const noteSet = NoteSet.fromIntervalSet(intervalSet, rotation);
  const noteNameSet = NoteNameSet.fromModifiers(noteSet, [
    'flat',
    'sharp',
    'doubleSharp',
  ]);
  expect(noteNameSet.noteNames.length).toBe(3);
  expect(noteNameSet.noteNames[0].unicode).toBe('F♭');
  expect(noteNameSet.noteNames[1].unicode).toBe('G♯');
  expect(noteNameSet.noteNames[2].unicode).toBe('A𝄪');
});

test('demerits comparison', () => {
  const cNaturalSet = new NoteNameSet([cNatural]);
  const fFlatSet = new NoteNameSet([fFlat]);
  const fDoubleSharpSet = new NoteNameSet([fDoubleSharp]);
  const eDoubleFlatSet = new NoteNameSet([eDoubleFlat]);
  expect(cNaturalSet.demerits).toBe(0);
  expect(fDoubleSharpSet.demerits).toBeGreaterThan(fFlatSet.demerits);
  expect(fDoubleSharpSet.demerits).toEqual(eDoubleFlatSet.demerits);
});
