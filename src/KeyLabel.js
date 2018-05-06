import React, {Component} from 'react';
import IrPoint from "./Utils/IrPoint";
import styled from 'styled-components';
import Angle from "./Utils/Angle";

const RADIUS = 64.5;

function KeyLabel(props) {
  let point = (new IrPoint(props.interval, RADIUS)).toXy();
  let rotation = -Angle.iToD(props.rotation);
  let transform = `translate(${point.x} ${point.y}) rotate(${rotation})`;
  return (
    <g transform={transform}>
      <rect x="-6" y="-6" width="12" height="12" rx={3}  ry={3}/>
      <text
        x={0}
        y={0.75}
        className={props.className}
        dominantBaseline={'middle'} // TODO address lack of IE support
        textAnchor={'middle'}
      >
        {props.children}
      </text>
    </g>
  );
}

export default styled(KeyLabel)`
  font-size: 7px;
  fill: white;
`;
