import React from 'react';
import { Polygon } from "./../Wheel/common/Polygon";
import { IrPoint } from "./../../Utils/Geometry/IrPoint";
import { IntervalSet } from '../../Utils/Music/IntervalSet';

const radius = 310;

interface Props {
  intervalSet: IntervalSet;
  className?: string;
  fill: string;
  opacity: string | number;
}

export function IntervalSetPolygon(props: Props) {
  const intervals = props.intervalSet.ordinals;
  const points = intervals.map(i => IrPoint.fromArray([i, radius]));
  return (
    <Polygon
      className={props.className}
      points={points}
      fill={props.fill}
      opacity={props.opacity}
    />
  );
}
