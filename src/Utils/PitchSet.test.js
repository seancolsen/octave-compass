import PitchSet from "./PitchSet";
import NoteSet from "./NoteSet";

test('constructor', () => {
  expect((new PitchSet(NoteSet.chromatic, 4)).pitches).toBeDefined();
});
