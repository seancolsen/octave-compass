import React from 'react';
import { Polygon } from "./../Wheel/common/Polygon";
import { IrPoint } from "./../../Utils/Geometry/IrPoint";
import { IntervalSet } from '../../Utils/Music/IntervalSet';

export interface IntervalSetPolygonProps {
  intervalSet: IntervalSet;
  radius: number;
  className?: string;
  fill?: string;
  opacity?: string | number;
}

export function IntervalSetPolygon(props: IntervalSetPolygonProps) {
  const intervals = props.intervalSet.ordinals;
  const points = intervals.map(i => IrPoint.fromArray([i, props.radius]));
  return (
    <Polygon
      className={props.className}
      points={points}
      fill={props.fill}
      opacity={props.opacity}
    />
  );
}
