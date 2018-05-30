import React from 'react';
import SvgCheckbox from "./SvgCheckbox";
import IrPoint from "./Utils/IrPoint";
import Arc from './Arc';
import styled from 'styled-components';
import IntervalLabel from "./IntervalLabel";

const checkboxRadius = 430;
const arcRadius = 430;
const arcSpan = 0.5;

const Background = styled(Arc)`
  stroke-width: 130px;
  stroke: ${props => (props.active) ? 'white' : '#e4e4e4'};
  fill: none;
  stroke-linecap: butt;
`;

const StyledIntervalLabel = styled(IntervalLabel)``;

function BaseInterval(props) {
  const point = (new IrPoint(props.interval, checkboxRadius)).toXy();
  return (
    <g onClick={props.onClick} className={props.className}>
      <Background
        startInterval={props.interval - arcSpan}
        endInterval={props.interval + arcSpan}
        radius={arcRadius}
        active={props.active}
      />
      <StyledIntervalLabel
        interval={props.interval}
        label={props.label}
        active={props.active}
      />
      <SvgCheckbox x={point.x} y={point.y} checked={props.active}/>
    </g>
  );
}

export default styled(BaseInterval)`
  & * {
    cursor: pointer;
  }
  &:hover ${StyledIntervalLabel} {
    text-decoration: underline;
  }
`;
