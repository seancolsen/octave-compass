import React from 'react';
import Arc from "./Arc";
import styled from 'styled-components';

const arcRadius = 450;
const arcSpan = 0.4;

const TextPath = styled(Arc)`
  fill: none;
  stroke: none;
`;

const StyledText = styled.text`
  fill: ${props => props.active ? '#FFF' : '#555'};
  font-size: 30px;
`;

export default function IntervalLabel(props) {
  const id = `interval-label-${props.interval}`;
  return (
    <g>
      <TextPath
        id={id}
        radius={arcRadius}
        startInterval={props.interval - arcSpan}
        endInterval={props.interval + arcSpan}
      />
      <StyledText active={props.active} textAnchor={'middle'}>
        <textPath href={`#${id}`} startOffset={'50%'}>
          {props.label}
        </textPath>
      </StyledText>
    </g>
  );
}
