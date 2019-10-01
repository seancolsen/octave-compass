import { ObjectLog } from "./ObjectLog";

test('constructor empty', () => {
  let ol = new ObjectLog<string>();
  expect(ol.log.size).toBe(0);
});

test('add', () => {
  let ol = new ObjectLog<string>();
  ol.add();
  expect(ol.log.size).toBe(0);
  ol = ol.add("foo");
  expect(ol.log.size).toBe(1);
  ol = ol.add("foo", 'baz', 'bat');
  expect(ol.log.size).toBe(4);
});

test('maxKey', () => {
  let ol = new ObjectLog<string>();
  expect(ol.maxKey).toBe(0);
  ol = ol.add("foo");
  expect(ol.maxKey).toBe(1);
});

test('old chords should be removed when new chords are added', () => {
  let ol = new ObjectLog<string>(new Map(), 0, 3);
  ol = ol.add('one');
  ol = ol.add('two');
  ol = ol.add('three');
  expect(ol.log.size).toBe(3);
  ol = ol.add('four');
  expect(ol.log.size).toBe(3);
  expect(ol.maxKey).toBe(4);
  expect([...ol.log.values()]).toEqual(['two', 'three', 'four']);
});
