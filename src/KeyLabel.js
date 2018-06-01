import React from 'react';
import IrPoint from "Utils/IrPoint";
import styled from 'styled-components';
import Angle from "Utils/Angle";

const radius = 350;
const size = 60;

const StyledRect = styled.rect`
  fill: ${props => (props.color === 'white') ? 'white' : 'black'};
`;

const StyledText = styled.text`
  font-size: ${props => props.parenthetical ? '34px' : '42px'};
  font-weight: ${props => props.parenthetical ? 'normal' : 'bold'};;
  fill: ${props => (props.color === 'white') ? 'black' : 'white'};
`;

export default function KeyLabel(props) {
  let point = (new IrPoint(props.interval, radius)).toXy();
  let rotation = -Angle.iToD(props.rotation);
  let transform = `translate(${point.x} ${point.y}) rotate(${rotation})`;
  return (
    <g transform={transform}>

      <StyledRect
        x={-size/2} y={-size/2}
        width={size} height={size}
        rx={size/6}  ry={size/6}
        color={props.color}
      />

      <StyledText
        x={1}
        y={4}
        dominantBaseline={'middle'} // TODO address lack of IE support
        textAnchor={'middle'}
        color={props.color}
        parenthetical={props.parenthetical}
      >
        {props.parenthetical ? '(' : ''}
          {props.children}
        {props.parenthetical ? ')' : ''}
      </StyledText>

    </g>
  );
}
