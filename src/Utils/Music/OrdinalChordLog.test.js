import OrdinalChordLog from "Utils/Music/OrdinalChordLog";
import OrdinalChord from "Utils/Music/OrdinalChord";
import Chord from "Utils/Music/Chord";

test('constructor empty', () => {
  let ocl = new OrdinalChordLog();
  expect(ocl.log.size).toBe(0);
});

test('add', () => {
  let ocl = new OrdinalChordLog();
  ocl = ocl.add(new OrdinalChord(0, Chord.fromName('major')));
  expect(ocl.log.size).toBe(1);
});

test('maxKey', () => {
  let ocl = new OrdinalChordLog();
  expect(ocl.maxKey).toBe(0);
  ocl = ocl.add(new OrdinalChord(0, Chord.fromName('major')));
  expect(ocl.maxKey).toBe(1);
});

test('old chords should be removed when new chords are added', () => {
  let ocl = new OrdinalChordLog(new Map(), 0, 3);
  ocl = ocl.add(new OrdinalChord(0, Chord.fromName('major')));
  ocl = ocl.add(new OrdinalChord(1, Chord.fromName('minor')));
  ocl = ocl.add(new OrdinalChord(10, Chord.fromName('augmented')));
  expect(ocl.log.size).toBe(3);
  ocl = ocl.add(new OrdinalChord(5, Chord.fromName('diminished')));
  expect(ocl.log.size).toBe(3);
  expect(ocl.maxKey).toBe(4);
  expect([...ocl.log].map(([key, ordinalChord]) =>
    ordinalChord.chord.defaultName
  )).toEqual(['minor', 'augmented', 'diminished']);
});
