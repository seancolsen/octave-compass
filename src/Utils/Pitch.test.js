import Note from "./Note";
import Pitch from "./Pitch";

const noteC = new Note(0);
const noteA = new Note(9);
const noteBFlatUnnamed = new Note(10);
const noteFSharpNamed = (new Note(6)).namedToMatch('sharp');
const middleC = new Pitch(noteC, 4);
const middleA = new Pitch(noteA, 4);
const bFlatBelowMiddleCUnnamed = new Pitch(noteBFlatUnnamed, 3);
const fSharpBelowMiddleCNamed = new Pitch(noteFSharpNamed, 3);

test('midiNumber', () => {
  expect(middleC.midiNumber).toBe(60);
  expect(middleA.midiNumber).toBe(69);
});

test('frequency', () => {
  expect(middleC.frequency).toBeRoughly(261.6255653005986);
  expect(middleA.frequency).toBeRoughly(440);
});

test('slashNotation', () => {
  expect(middleC.slashNotation).toBe('C/4');
  expect(middleA.slashNotation).toBe('A/4');
  expect(bFlatBelowMiddleCUnnamed.slashNotation).toBe('Bb/3');
  expect(fSharpBelowMiddleCNamed.slashNotation).toBe('F#/3');
});
