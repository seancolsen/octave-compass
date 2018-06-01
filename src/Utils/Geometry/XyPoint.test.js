import XyPoint from 'Utils/Geometry/XyPoint';
import PrPoint from 'Utils/Geometry/PrPoint';
import IrPoint from 'Utils/Geometry/IrPoint';

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
    expect(XyPoint.fromArray(d.in).toPr())
      .toBeTheSamePointAs(PrPoint.fromArray(d.out))
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
    expect(XyPoint.fromArray(d.in).toIr())
      .toBeTheSamePointAs(IrPoint.fromArray(d.out))
  });
});

test('toString', () => {
  expect(XyPoint.fromArray([-1.3, 9.61]).toString()).toBe("-1.3,9.61");
});

test('stringFromIrArray', () => {
  let irPoints = [
    [0, 0],
    [3, 1],
  ].map(coords => IrPoint.fromArray(coords));
  expect(XyPoint.stringFromIrArray(irPoints)).toBe('0,0 1,0');
});
