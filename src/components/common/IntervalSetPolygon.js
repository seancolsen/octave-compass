import React from 'react';
import Polygon from "components/Wheel/common/Polygon";
import IrPoint from "Utils/Geometry/IrPoint";

const radius = 310;

export default function IntervalSetPolygon(props) {
  const intervals = props.intervalSet.ordinals;
  const points = intervals.map(i => IrPoint.fromArray([i, radius]));
  return (
    <Polygon
      className={props.className}
      points={points}
    />
  );
}
