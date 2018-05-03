import React from 'react';
import Angle from "./Utils/Angle";

export default function Group(props) {
  let rotation = Angle.iToD(props.rotation || 0);
  let transformString = `rotate(${rotation})`;
  return (
    <g onMouseDown={props.onMouseDown} transform={transformString}>
      {props.children}
    </g>
  );
}
