import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { IrPoint } from '../../../Utils/Geometry/IrPoint';
import { Angle } from '../../../Utils/Geometry/Angle';

const size = 60;

const StyledRect = styled.rect`
  fill: ${props => (props.color === 'white') ? 'white' : 'black'};
`;

const StyledText = styled.text<{parenthetical: boolean}>`
  font-size: ${props => props.parenthetical ? '34px' : '42px'};
  font-weight: ${props => props.parenthetical ? 'normal' : 'bold'};
  fill: ${props => (props.color === 'white') ? 'black' : 'white'};
  stroke: none;
`;

interface Props {
  interval: number;
  radius: number;
  rotation: number;
  color: string;
  parenthetical: boolean;
  children: ReactNode;
}

export function KeyLabel(props: Props) {
  let point = (new IrPoint(props.interval, props.radius)).toXy();
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
