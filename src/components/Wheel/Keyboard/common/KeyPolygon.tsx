import React from 'react';
import { Scalar } from '../../../../Utils/Math/Scalar';
import { IrPoint } from '../../../../Utils/Geometry/IrPoint';
import { Polygon } from '../../common/Polygon';
import { Pitch } from '../../../../Utils/Music/Pitch';

const innerRadius = 308;
const outerRadius = 400;

export interface KeyPolygonProps {
  pitch: Pitch;
  className?: string;
}

export function KeyPolygon(props: KeyPolygonProps) {
  const shape: [number, number][] = [
    [-0.5, outerRadius * Scalar.rFactorAtEdge],
    [0, outerRadius],
    [0.5, outerRadius * Scalar.rFactorAtEdge],
    [0.5, innerRadius * Scalar.rFactorAtEdge],
    [0, innerRadius],
    [-0.5, innerRadius * Scalar.rFactorAtEdge],
  ];
  const points = shape.map(ir =>
    IrPoint.fromArray(ir).plusI(props.pitch.note.id)
  );
  return <Polygon points={points} className={props.className}/>;
}
