import { Note } from "./Note";
import { Pitch } from "./Pitch";

import { toBeRoughly } from './../Testing/JestCustomMatchers';
expect.extend({toBeRoughly});

const noteC = new Note(0);
const noteA = new Note(9);
const noteB = new Note(11);
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

test('SPI edge case', () => {
  /**
   * This test exists to demonstrate an edge case within Scientific Pitch
   * Notation. If we have the note that's one note below "C4", we can call
   * it "B3" and that seems intuitive. But if we instead choose to refer to that
   * note as a type of "C♭", then we need to call it "C♭4". This is not so
   * intuitive because the note actually lies within the "3" octave. For the
   * purposes of this application, we will store the octave as 3 but produce a
   * "slash notation" that shows 4.
   */
  const noteCFlatBelowMiddleCNamed = new Pitch(noteB.namedUsing('flat'), 3);
  expect(noteCFlatBelowMiddleCNamed.slashNotation).toBe('Cb/4');
  expect(noteCFlatBelowMiddleCNamed.octave).toBe(3);

  const noteBSharpSameAsMiddleCNamed = new Pitch(noteC.namedUsing('sharp'), 4);
  expect(noteBSharpSameAsMiddleCNamed.slashNotation).toBe('B#/3');
  expect(noteBSharpSameAsMiddleCNamed.octave).toBe(4);
});
