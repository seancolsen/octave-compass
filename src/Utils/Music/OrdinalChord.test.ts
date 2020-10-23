import { Chord } from "./Chord";
import { OrdinalChord } from "./OrdinalChord";

test('intervalSet', () => {
  const majorChord = Chord.fromBinary(145);
  expect((new OrdinalChord(0, majorChord)).intervalSet.binary).toBe(145);
  expect((new OrdinalChord(5, majorChord)).intervalSet.binary).toBe(545);
});