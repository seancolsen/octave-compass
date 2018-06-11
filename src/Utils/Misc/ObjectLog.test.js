import ObjectLog from "Utils/Misc/ObjectLog";

test('constructor empty', () => {
  let ol = new ObjectLog();
  expect(ol.log.size).toBe(0);
});

test('add single entries', () => {
  let ol = new ObjectLog();
  ol = ol.add("foo");
  expect(ol.log.size).toBe(1);
});

test('maxKey', () => {
  let ol = new ObjectLog();
  expect(ol.maxKey).toBe(0);
  ol = ol.add("foo");
  expect(ol.maxKey).toBe(1);
});

test('old chords should be removed when new chords are added', () => {
  let ol = new ObjectLog(new Map(), 0, 3);
  ol = ol.add('one');
  ol = ol.add('two');
  ol = ol.add('three');
  expect(ol.log.size).toBe(3);
  ol = ol.add('four');
  expect(ol.log.size).toBe(3);
  expect(ol.maxKey).toBe(4);
  expect([...ol.log.values()]).toEqual(['two', 'three', 'four']);
});
