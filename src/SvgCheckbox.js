import React from 'react';
import styled from "styled-components";

const size = 6;

const StyledRect = styled.rect`
  fill: ${props => (props.checked) ? 'white' : 'black'};
`;

export default function SvgCheckbox(props) {
  const transform = `translate(${props.x} ${props.y})`;
  return (
    <g transform={transform}>
      <StyledRect
        x={-size/2} y={-size/2}
        width={size} height={size}
        rx={2} ry={2}
        checked={props.checked}
      />
    </g>
  );
}
