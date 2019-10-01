import { Modifier } from "./Modifier";

test('constructor', () => {
  expect((new Modifier('sharp')).ascii).toBe('#');
  expect((new Modifier('flat')).ascii).toBe('b');
});
