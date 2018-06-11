import ObjectLog from "Utils/Misc/ObjectLog";
import OrdinalChord from "Utils/Music/OrdinalChord";
import Chord from "Utils/Music/Chord";

test('constructor empty', () => {
  let ocl = new ObjectLog();
  expect(ocl.log.size).toBe(0);
});

test('add', () => {
  let ocl = new ObjectLog();
  ocl = ocl.add(new OrdinalChord(0, Chord.fromName('major')));
  expect(ocl.log.size).toBe(1);
});

test('maxKey', () => {
  let ocl = new ObjectLog();
  expect(ocl.maxKey).toBe(0);
  ocl = ocl.add(new OrdinalChord(0, Chord.fromName('major')));
  expect(ocl.maxKey).toBe(1);
});

test('old chords should be removed when new chords are added', () => {
  let ol = new ObjectLog(new Map(), 0, 3);
  ol = ol.add(new OrdinalChord(0, Chord.fromName('major')));
  ol = ol.add(new OrdinalChord(1, Chord.fromName('minor')));
  ol = ol.add(new OrdinalChord(10, Chord.fromName('augmented')));
  expect(ol.log.size).toBe(3);
  ol = ol.add(new OrdinalChord(5, Chord.fromName('diminished')));
  expect(ol.log.size).toBe(3);
  expect(ol.maxKey).toBe(4);
  expect([...ol.log].map(([key, ordinalChord]) =>
    ordinalChord.chord.defaultName
  )).toEqual(['minor', 'augmented', 'diminished']);
});
