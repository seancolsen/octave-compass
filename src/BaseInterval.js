import React from 'react';
import SvgCheckbox from "./SvgCheckbox";
import IrPoint from "./Utils/IrPoint";
import Arc from './Arc';
import styled from 'styled-components';
import IntervalLabel from "./IntervalLabel";

const checkboxRadius = 410;
const arcRadius = 425;
const arcSpan = 0.5;

const Background = styled(Arc)`
  stroke-width: 130px;
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
      <IntervalLabel
        interval={props.interval}
        label={props.label}
        active={props.active}
      />
      <SvgCheckbox x={point.x} y={point.y} checked={props.active}/>
    </g>
  );
}
