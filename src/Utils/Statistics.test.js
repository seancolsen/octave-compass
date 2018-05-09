import Statistics from "./Statistics";

test('valueFrequency', () => {
  expect(Statistics.valueFrequency(['a', 'a', 'b', 'b', 'b', 'c']))
    .toEqual({a: 2, b: 3, c: 1});
});
