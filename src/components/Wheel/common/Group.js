import React from 'react';
import Angle from "Utils/Geometry/Angle";

export default function Group(props) {
  let rotation = Angle.iToD(props.rotation || 0);
  let transformString = `rotate(${rotation})`;
  return (
    <g
      onMouseDown={props.onMouseDown}
      onTouchStart={props.onTouchStart}
      transform={transformString}
    >
      {props.children}
    </g>
  );
}
