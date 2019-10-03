import React from 'react';
import { XyPoint } from './../../../Utils/Geometry/XyPoint';
import { IrPoint } from '../../../Utils/Geometry/IrPoint';

interface Props {
  points: IrPoint[];
  className: string;
  fill?: string;
  opacity?: string;
}

export function Polygon(props: Props) {
  let pointsString = XyPoint.stringFromIrArray(props.points);
  return <polygon
    className={props.className}
    points={pointsString}
    fill={props.fill}
    opacity={props.opacity}
  />;
}
