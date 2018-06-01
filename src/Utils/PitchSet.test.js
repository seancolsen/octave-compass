import PitchSet from "Utils/PitchSet";
import NoteSet from "Utils/NoteSet";
import Note from "Utils/Note";

test('constructor', () => {
  expect((new PitchSet(NoteSet.chromatic, 4)).pitches).toBeDefined();
});

test('Phrygian Dominant in B♭', () => {
  /**
   * This test exists to demonstrate an interesting edge case. In this scale,
   * the second note is named as C♭. The SPN for that note should be "C♭5" [1].
   * However, we still want to store the octave for that note as "4" (not "5")
   * because we use the octave in calculating the frequency. This is a messy
   * consequence of the way that SPN is defined. So this test asserts that the
   * octave of that note remain as 4.
   *
   * [1][https://music.stackexchange.com/a/69373/50844]
   */
  const noteIds = [10, 11, 2, 3, 5, 6, 8];
  const noteSet = new NoteSet(noteIds.map(i => new Note(i)));
  const pitches = noteSet.named.pitchSetStartingFrom(4).pitches;
  const octaves = pitches.map(p => p.octave);
  expect(octaves).toEqual([
    4,
    4, // Notice this is 4 not 5
    5,
    5,
    5,
    5,
    5
  ]);
  const slashNotation = pitches.map(p => p.slashNotation);
  expect(slashNotation).toEqual([
    "Bb/4",
    "Cb/5", // Notice this is 5 not 4
    "D/5",
    "Eb/5",
    "F/5",
    "Gb/5",
    "Ab/5"
  ]);
});
