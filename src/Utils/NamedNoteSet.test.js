import NamedNoteSet from './NamedNoteSet';
import NamedNote from './NamedNote';
import {musicTheory} from "../Data/musicTheory";
import Note from "./Note";
import IntervalSet from "./IntervalSet";
import NoteSet from "./NoteSet";

const noteC = new Note(0);
const noteDFlat = new Note(1);
const noteD = new Note(2);
const noteEFlat = new Note(3);
const noteE = new Note(4);
const noteF = new Note(5);
const noteGFlat = new Note(6);
const noteG = new Note(7);
const noteAFlat = new Note(8);

const cNatural = noteC.namedAs('natural');
const cSharp = noteDFlat.namedAs('sharp');
const dFlat = noteDFlat.namedAs('flat');
const eDoubleFlat = noteD.namedAs('doubleFlat');
const dSharp = noteEFlat.namedAs('sharp');
const fFlat = noteE.namedAs('flat');
const eSharp = noteF.namedAs('sharp');
const eDoubleSharp = noteGFlat.namedAs('doubleSharp');
const fDoubleSharp = noteG.namedAs('doubleSharp');
const gNatural = noteG.namedAs('natural');
const gSharp = noteAFlat.namedAs('sharp');

test('direction sharp', () => {
  const set = new NamedNoteSet([cNatural, cSharp, eDoubleSharp]);
  expect(set.direction).toBe('sharp');
});

test('direction flat', () => {
  const set = new NamedNoteSet([cNatural, dFlat]);
  expect(set.direction).toBe('flat');
});

test('direction natural', () => {
  const set = new NamedNoteSet([cNatural, gNatural]);
  expect(set.direction).toBe('natural');
});

test('direction null', () => {
  const set = new NamedNoteSet([cNatural, dFlat, eSharp]);
  expect(set.direction).toBeNull();
});

test('duplicateBaseNamesDemerits positive', () => {
  const set = new NamedNoteSet([cNatural, cSharp]);
  expect(set.duplicateBaseNamesDemerits).toBeGreaterThan(0);
});

test('duplicateBaseNamesDemerits zero', () => {
  const set = new NamedNoteSet([cNatural, dFlat]);
  expect(set.duplicateBaseNamesDemerits).toBe(0);
});

test('mixOfSharpsAndFlatsDemerits positive', () => {
  const set = new NamedNoteSet([dFlat, dSharp]);
  expect(set.mixOfSharpsAndFlatsDemerits).toBeGreaterThan(0);
});

test('mixOfSharpsAndFlatsDemerits zero', () => {
  const sharps = new NamedNoteSet([cSharp, dSharp]);
  expect(sharps.mixOfSharpsAndFlatsDemerits).toBe(0);
  const sharpAndDoubleSharp = new NamedNoteSet([cSharp, fDoubleSharp]);
  expect(sharpAndDoubleSharp.mixOfSharpsAndFlatsDemerits).toBe(0);
  const naturalAndSharp = new NamedNoteSet([cNatural, dSharp]);
  expect(naturalAndSharp.mixOfSharpsAndFlatsDemerits).toBe(0);
});

test('accidentalInsteadOfNaturalDemerits positive', () => {
  const set = new NamedNoteSet([cNatural, dFlat, dSharp, eSharp, fDoubleSharp]);
  expect(set.accidentalInsteadOfNaturalDemerits).toBeGreaterThan(0);
});

test('accidentalInsteadOfNaturalDemerits zero', () => {
  const set = new NamedNoteSet([cNatural, dFlat, dSharp, eDoubleSharp]);
  expect(set.accidentalInsteadOfNaturalDemerits).toBe(0);
});

test('doubleModifierDemerits positive', () => {
  const set = new NamedNoteSet([cNatural, dFlat, dSharp, eDoubleSharp]);
  expect(set.doubleModifierDemerits).toBeGreaterThan(0);
});

test('doubleModifierDemerits zero', () => {
  const set = new NamedNoteSet([cNatural, dFlat, dSharp, eSharp]);
  expect(set.doubleModifierDemerits).toBe(0);
});

test('demerits positive', () => {
  const set = new NamedNoteSet([cNatural, cSharp, dSharp, fFlat, eDoubleSharp]);
  expect(set.demerits).toBeGreaterThan(0);
});

test('demerits zero', () => {
  const set = new NamedNoteSet([cNatural, dSharp]);
  expect(set.demerits).toBe(0);
});

test('fromModifiers simple', () => {
  const intervalSet = new IntervalSet(0b000010010001);
  const rotation = 0;
  const noteSet = NoteSet.fromIntervalSet(intervalSet, rotation);
  const namedNoteSet = NamedNoteSet.fromModifiers(noteSet, [
    'natural',
    'natural',
    'natural',
  ]);
  expect(namedNoteSet.namedNotes.length).toBe(3);
  expect(namedNoteSet.namedNotes[0].unicode).toBe('C');
  expect(namedNoteSet.namedNotes[1].unicode).toBe('E');
  expect(namedNoteSet.namedNotes[2].unicode).toBe('G');
});

test('fromModifiers complex', () => {
  const intervalSet = new IntervalSet(0b000010010001);
  const rotation = -4;
  const noteSet = NoteSet.fromIntervalSet(intervalSet, rotation);
  const namedNoteSet = NamedNoteSet.fromModifiers(noteSet, [
    'flat',
    'sharp',
    'doubleSharp',
  ]);
  expect(namedNoteSet.namedNotes.length).toBe(3);
  expect(namedNoteSet.namedNotes[0].unicode).toBe('F♭');
  expect(namedNoteSet.namedNotes[1].unicode).toBe('G♯');
  expect(namedNoteSet.namedNotes[2].unicode).toBe('A𝄪');
});

test('single note demerits comparison', () => {
  const cNaturalSet = new NamedNoteSet([cNatural]);
  const fFlatSet = new NamedNoteSet([fFlat]);
  const fDoubleSharpSet = new NamedNoteSet([fDoubleSharp]);
  const eDoubleFlatSet = new NamedNoteSet([eDoubleFlat]);
  expect(cNaturalSet.demerits).toBe(0);
  expect(fDoubleSharpSet.demerits).toBeGreaterThan(fFlatSet.demerits);
  expect(fDoubleSharpSet.demerits).toEqual(eDoubleFlatSet.demerits);
});

test('double note demerits comparison', () => {
  const betterSet = new NamedNoteSet([fDoubleSharp, gSharp]);
  const worseSet = new NamedNoteSet([gNatural, gSharp]);
  expect(betterSet.demerits).toBeLessThan(worseSet.demerits);
});


