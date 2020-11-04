import { Midi } from "./Midi";

test('noteNumberToFrequency', () => {
  expect(Midi.noteNumberToFrequency(69 - 12)).toEqual(440 / 2);
  expect(Midi.noteNumberToFrequency(69)).toEqual(440);
  expect(Midi.noteNumberToFrequency(69 + 12)).toEqual(440 * 2);
});

test('frequencyToNoteNumber', () => {
  expect(Midi.frequencyToNoteNumber(440 / 2)).toEqual(69 - 12);
  expect(Midi.frequencyToNoteNumber(440)).toEqual(69);
  expect(Midi.frequencyToNoteNumber(440 * 2)).toEqual(69 + 12);
});