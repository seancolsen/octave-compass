<script lang="ts">

</script>

<!-- import React from 'react';
import styled from "styled-components";

const size = 30;
const checkMarkCharacter = '✔';

const StyledRect = styled.rect<{checked: boolean; clickable: boolean}>`
  fill: ${props => (props.checked) ? 'white' : '#ddd'};
  stroke: ${p => p.clickable ? '#666' : '#BBB'};
  stroke-width: 2px;
`;

const StyledText = styled.text<{clickable: boolean}>`
  font-size: 25px;
  fill: ${p => p.clickable ? 'black' : '#BBB'};
`;

interface Props {
  clickable: boolean;
  checked: boolean;
  x: number;
  y: number;
  opacity?: number;
}

export function SvgCheckbox(props: Props) {

  const checkMark = (
    <StyledText
      x={1}
      y={5}
      dominantBaseline={'middle'} // TODO address lack of IE support
      textAnchor={'middle'}
      clickable={props.clickable}
    >
      {checkMarkCharacter}
    </StyledText>
  );

  const transform = `translate(${props.x} ${props.y})`;

  return (
    <g
      transform={transform}
      opacity={props.opacity}
    >
      <StyledRect
        x={-size / 2} y={-size / 2}
        width={size} height={size}
        rx={size / 5} ry={size / 5}
        checked={props.checked}
        clickable={props.clickable}
      />
      {props.checked ? checkMark : null}
    </g>
  );

} -->
