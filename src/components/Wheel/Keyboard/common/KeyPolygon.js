import React from 'react';
import Scalar from "Utils/Math/Scalar";
import IrPoint from "Utils/Geometry/IrPoint";
import Polygon from "components/Wheel/common/Polygon";

const innerRadius = 308;
const outerRadius = 400;

export default function KeyPolygon(props) {
  const shape = [
    [-0.5, outerRadius * Scalar.rFactorAtEdge],
    [0, outerRadius],
    [0.5, outerRadius * Scalar.rFactorAtEdge],
    [0.5, innerRadius * Scalar.rFactorAtEdge],
    [0, innerRadius],
    [-0.5, innerRadius * Scalar.rFactorAtEdge],
  ];
  const points = shape.map(ir =>
    IrPoint.fromArray(ir).plus({i: props.pitch.note.id})
  );
  return <Polygon points={points} className={props.className}/>;
}
