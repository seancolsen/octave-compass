import React, {Component} from 'react';
import IrPoint from "./Utils/IrPoint";
import styled from 'styled-components';
import Angle from "./Utils/Angle";

const RADIUS = 64.5;

const StyledRect = styled.rect`
  fill: ${props => (props.color === 'white') ? 'white' : 'black'};
`;

const StyledText = styled.text`
  font-size: 7px;
  fill: ${props => (props.color === 'white') ? 'black' : 'white'};
`;

export default function KeyLabel(props) {
  let point = (new IrPoint(props.interval, RADIUS)).toXy();
  let rotation = -Angle.iToD(props.rotation);
  let transform = `translate(${point.x} ${point.y}) rotate(${rotation})`;
  return (
    <g transform={transform}>

      <StyledRect
        x="-6" y="-6"
        width="12" height="12"
        rx={3}  ry={3}
        color={props.color}
      />

      <StyledText
        x={0}
        y={0.75}
        className={props.className}
        dominantBaseline={'middle'} // TODO address lack of IE support
        textAnchor={'middle'}
        color={props.color}
      >
        {props.children}
      </StyledText>

    </g>
  );
}
