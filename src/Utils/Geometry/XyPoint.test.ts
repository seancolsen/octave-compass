import { XyPoint, XyPointArray } from './XyPoint';
import { PrPoint } from './PrPoint';
import { IrPoint, IrPointArray } from './IrPoint';

import { toBeTheSamePointAs } from './../Testing/JestCustomMatchers';
expect.extend({toBeTheSamePointAs});

const PI = Math.PI;

test('toPr', () => {
  let data = [
    {in: [0, 0], out: [0, 0]},
    {in: [1, 0], out: [0, 1]},
    {in: [0, -1], out: [PI / 2, 1]},
    {in: [-1, 0], out: [PI, 1]},
    {in: [0, 1], out: [3 * PI / 2, 1]},
  ];
  data.forEach((d) => {
    expect(XyPoint.fromArray(d.in as XyPointArray).toPr())
      .toBeTheSamePointAs(PrPoint.fromArray(d.out as XyPointArray))
  });
});

test('toIr', () => {
  let data = [
    {in: [0, -1], out: [0, 1]},
    {in: [1, 0], out: [3, 1]},
    {in: [0, 1], out: [6, 1]},
    {in: [-1, 0], out: [9, 1]},
  ];
  data.forEach((d) => {
    expect(XyPoint.fromArray(d.in as XyPointArray).toIr())
      .toBeTheSamePointAs(IrPoint.fromArray(d.out as XyPointArray))
  });
});

test('toString', () => {
  expect(XyPoint.fromArray([-1.3, 9.61]).toString()).toBe("-1.3,9.61");
});

test('stringFromIrArray', () => {
  let irPoints = [
    [0, 0] as IrPointArray,
    [3, 1] as IrPointArray,
  ].map(coords => IrPoint.fromArray(coords as XyPointArray));
  expect(XyPoint.stringFromIrArray(irPoints)).toBe('0,0 1,0');
});
