import React from 'react';
import SvgCheckbox from "./SvgCheckbox";
import IrPoint from "./Utils/IrPoint";

const RADIUS = 82;

export default function BaseInterval(props) {
  const point = (new IrPoint(props.interval, RADIUS)).toXy();
  return (
    <g onClick={props.onClick}>
      <SvgCheckbox x={point.x} y={point.y} checked={props.active}/>
    </g>
  );
}
