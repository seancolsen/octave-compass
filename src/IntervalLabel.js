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
  font-size: 20px;
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
      <StyledText>
        <textPath href={`#${id}`}>{props.label}</textPath>
      </StyledText>
    </g>
  );
}
