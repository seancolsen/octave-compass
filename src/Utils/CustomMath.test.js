import CustomMath from "./CustomMath";

test('valueFrequency', () => {
  expect(CustomMath.valueFrequency(['a', 'a', 'b', 'b', 'b', 'c']))
    .toEqual({a: 2, b: 3, c: 1});
});

test('cartesianProduct', () => {
  expect(CustomMath.cartesianProduct(
    ['a', 'b', 'c'],
    ['d'],
    ['e', 'f']
  )).toEqual([
    ['a', 'd', 'e'],
    ['a', 'd', 'f'],
    ['b', 'd', 'e'],
    ['b', 'd', 'f'],
    ['c', 'd', 'e'],
    ['c', 'd', 'f'],
  ]);
});

test('cartesianProduct with spread', () => {
  const array = [['a', 'b'], ['c', 'd']];
  expect(CustomMath.cartesianProduct(...array)).toEqual([
    ['a', 'c'],
    ['a', 'd'],
    ['b', 'c'],
    ['b', 'd'],
  ]);
});
