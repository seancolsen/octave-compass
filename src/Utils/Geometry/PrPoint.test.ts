import {XyPoint} from './XyPoint';
import {PrPoint, PrPointArray} from './PrPoint';
import {IrPoint} from './IrPoint';

import { toBeTheSamePointAs } from './../Testing/JestCustomMatchers';
expect.extend({toBeTheSamePointAs});

const PI = Math.PI;

test('fromArray', () => {
  expect(PrPoint.fromArray([1, 2])).toEqual(new PrPoint(1, 2));
});

test('toIr', () => {
  expect(PrPoint.fromArray([0, 1]).toIr())
    .toBeTheSamePointAs(IrPoint.fromArray([3, 1]))
});

test('toXy', () => {
  let data = [
    {in: [0, 0], out: [0, 0]},
    {in: [0, 1], out: [1, 0]},
    {in: [PI / 2, 1], out: [0, -1]},
    {in: [PI, 1], out: [-1, 0]},
    {in: [3 * PI / 2, 1], out: [0, 1]},
  ];
  data.forEach((d) => {
    expect(PrPoint.fromArray(d.in as PrPointArray).toXy())
      .toBeTheSamePointAs(XyPoint.fromArray(d.out as PrPointArray))
  });
});

