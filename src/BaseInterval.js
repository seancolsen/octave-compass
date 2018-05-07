import React from 'react';
import SvgCheckbox from "./SvgCheckbox";
import IrPoint from "./Utils/IrPoint";
import Arc from './Arc';
import styled from 'styled-components';

const checkboxRadius = 82;
const arcRadius = 85;
const arcSpan = 0.5;

const Background = styled(Arc)`
  stroke-width: 26px;
  stroke: ${props => (props.active) ? '#888' : '#777'};
  fill: none;
  stroke-linecap: butt;
`;

export default function BaseInterval(props) {
  const point = (new IrPoint(props.interval, checkboxRadius)).toXy();
  return (
    <g onClick={props.onClick}>
      <Background
        startInterval={props.interval - arcSpan}
        endInterval={props.interval + arcSpan}
        radius={arcRadius}
        active={props.active}
      />
      <SvgCheckbox x={point.x} y={point.y} checked={props.active}/>
    </g>
  );
}
