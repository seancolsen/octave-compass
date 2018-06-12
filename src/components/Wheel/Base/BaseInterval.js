import React from 'react';
import SvgCheckbox from "components/Wheel/Base/SvgCheckbox";
import IrPoint from "Utils/Geometry/IrPoint";
import Arc from 'components/Wheel/common/Arc';
import styled from 'styled-components';
import IntervalLabel from "components/Wheel/Base/IntervalLabel";

const checkboxRadius = 430;
const arcRadius = 430;
const arcSpan = 0.5;

const StyledIntervalLabel = styled(IntervalLabel)``;

const StyledG = styled.g`
  & * {
    cursor: ${p => p.clickable ? 'pointer' : 'default'};
  }
  &:hover ${StyledIntervalLabel} {
    text-decoration: ${p => p.clickable ? 'underline' : 'none'};
  }
`;

const Background = styled(Arc)`
  stroke-width: 130px;
  stroke: ${props => (props.active) ? 'white' : '#e4e4e4'};
  fill: none;
  stroke-linecap: butt;
`;

export default function BaseInterval(props) {
  const point = (new IrPoint(props.interval, checkboxRadius)).toXy();
  const clickable = props.interval !== 0;
  return (
    <StyledG
      clickable={clickable}
      onClick={() => clickable ?
        props.toggleInterval(props.interval) :
        null
      }
      className={props.className}
    >
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
        <SvgCheckbox
          x={point.x}
          y={point.y}
          checked={props.active}
          clickable={clickable}
        />
    </StyledG>
  );
}

