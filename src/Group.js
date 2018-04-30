import React from 'react';
import Angle from "./Utils/Angle";

export default function Group(props) {
  let rotation = Angle.i_d(props.rotation || 0);
  let transformString = `rotate(${rotation})`;
  return (
    <g onClick={props.onClick} transform={transformString}>
      {props.children}
    </g>
  );
}
