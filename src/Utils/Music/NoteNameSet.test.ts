import { NoteNameSet } from './NoteNameSet';
import { Note } from "./Note";
import { IntervalSet } from "./IntervalSet";
import { NoteSet } from "./NoteSet";

const noteC = new Note(0);
const noteDFlat = new Note(1);
const noteD = new Note(2);
const noteEFlat = new Note(3);
const noteE = new Note(4);
const noteF = new Note(5);
const noteGFlat = new Note(6);
const noteG = new Note(7);
const noteAFlat = new Note(8);

const cNatural = noteC.getNameUsing('natural');
const cSharp = noteDFlat.getNameUsing('sharp');
const dFlat = noteDFlat.getNameUsing('flat');
const eDoubleFlat = noteD.getNameUsing('doubleFlat');
const dSharp = noteEFlat.getNameUsing('sharp');
const fFlat = noteE.getNameUsing('flat');
const eSharp = noteF.getNameUsing('sharp');
const eDoubleSharp = noteGFlat.getNameUsing('doubleSharp');
const fDoubleSharp = noteG.getNameUsing('doubleSharp');
const gNatural = noteG.getNameUsing('natural');
const gSharp = noteAFlat.getNameUsing('sharp');

test('direction sharp', () => {
  const set = new NoteNameSet([cNatural, cSharp, eDoubleSharp]);
  expect(set.direction).toBe('sharp');
});

test('direction flat', () => {
  const set = new NoteNameSet([cNatural, dFlat]);
  expect(set.direction).toBe('flat');
});

test('direction natural', () => {
  const set = new NoteNameSet([cNatural, gNatural]);
  expect(set.direction).toBe('natural');
});

test('direction null', () => {
  const set = new NoteNameSet([cNatural, dFlat, eSharp]);
  expect(set.direction).toBeNull();
});

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
  const intervalSet = IntervalSet.fromBinary(0b000010010001);
  const rotation = 0;
  const noteSet = NoteSet.fromIntervalSetAndTonalCenter(intervalSet, -rotation);
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
  const intervalSet = IntervalSet.fromBinary(0b000010010001);
  const rotation = -4;
  const noteSet = NoteSet.fromIntervalSetAndTonalCenter(intervalSet, -rotation);
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

test('single note demerits comparison', () => {
  const cNaturalSet = new NoteNameSet([cNatural]);
  const fFlatSet = new NoteNameSet([fFlat]);
  const fDoubleSharpSet = new NoteNameSet([fDoubleSharp]);
  const eDoubleFlatSet = new NoteNameSet([eDoubleFlat]);
  expect(cNaturalSet.demerits).toBe(0);
  expect(fDoubleSharpSet.demerits).toBeGreaterThan(fFlatSet.demerits);
  expect(fDoubleSharpSet.demerits).toEqual(eDoubleFlatSet.demerits);
});

test('double note demerits comparison', () => {
  const betterSet = new NoteNameSet([fDoubleSharp, gSharp]);
  const worseSet = new NoteNameSet([gNatural, gSharp]);
  expect(betterSet.demerits).toBeLessThan(worseSet.demerits);
});


