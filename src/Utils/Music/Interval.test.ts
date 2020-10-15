import { Interval } from "./Interval";

test('constructor', () => {
  expect((new Interval(3)).shortName).toEqual('♭3');
});
