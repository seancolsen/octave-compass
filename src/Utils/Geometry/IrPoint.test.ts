import {XyPoint} from './XyPoint';
import {IrPoint, IrPointArray} from './IrPoint';
import {PrPoint} from './PrPoint';

import { toBeTheSamePointAs } from './../Testing/JestCustomMatchers';
expect.extend({toBeTheSamePointAs});

test('toXy', () => {
  let data = [
    {in: [0, 1], out: [0, -1]},
    {in: [3, 1], out: [1, 0]},
    {in: [6, 1], out: [0, 1]},
    {in: [9, 1], out: [-1, 0]},
  ];
  data.forEach((d) => {
    expect(IrPoint.fromArray(d.in as IrPointArray).toXy())
      .toBeTheSamePointAs(XyPoint.fromArray(d.out as IrPointArray))
  });
});

test('toPr', () => {
  expect(IrPoint.fromArray([3, 1]).toPr())
    .toBeTheSamePointAs(PrPoint.fromArray([0, 1]));
});

test('plus', () => {
  expect((new IrPoint(4, 1)).plus(new IrPoint(0, 0.5)))
    .toBeTheSamePointAs(new IrPoint(4, 1.5));
  expect((new IrPoint(3, 1)).plus(new IrPoint(2, 0)))
    .toBeTheSamePointAs(new IrPoint(5, 1));
  expect((new IrPoint(3, 1)).plus(new IrPoint(-1, 0)))
    .toBeTheSamePointAs(new IrPoint(2, 1));
  expect((new IrPoint(3, 1)).plus(new IrPoint(-1, 0.5)))
    .toBeTheSamePointAs(new IrPoint(2, 1.5));
});
