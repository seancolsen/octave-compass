import XyPoint from './XyPoint';
import IrPoint from './IrPoint';
import PrPoint from './PrPoint';

test('toXy', () => {
  let data = [
    {in: [0, 1], out: [0, -1]},
    {in: [3, 1], out: [1, 0]},
    {in: [6, 1], out: [0, 1]},
    {in: [9, 1], out: [-1, 0]},
  ];
  data.forEach((d) => {
    expect(IrPoint.fromArray(d.in).toXy())
      .toBeTheSamePointAs(XyPoint.fromArray(d.out))
  });
});

test('toPr', () => {
  expect(IrPoint.fromArray([3, 1]).toPr())
    .toBeTheSamePointAs(PrPoint.fromArray([0, 1]));
});

test('plus', () => {
  expect((new IrPoint(4, 1)).plus({r: 0.5}))
    .toBeTheSamePointAs(new IrPoint(4, 1.5));
  expect((new IrPoint(3, 1)).plus({i: 2}))
    .toBeTheSamePointAs(new IrPoint(5, 1));
  expect((new IrPoint(3, 1)).plus({i: -1}))
    .toBeTheSamePointAs(new IrPoint(2, 1));
  expect((new IrPoint(3, 1)).plus({i: -1, r: 0.5}))
    .toBeTheSamePointAs(new IrPoint(2, 1.5));
});
