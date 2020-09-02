import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { IrPoint } from '../../../Utils/Geometry/IrPoint';
import { Angle } from '../../../Utils/Geometry/Angle';

const size = 60;

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
  strokeWidth?: number;
  isParenthetical: boolean;
  children?: ReactNode;
}
export function KeyLabel(p: Props) {
  let point = (new IrPoint(p.interval, p.radius)).toXy();
  let rotation = -Angle.iToD(p.rotation);
  let transform = `translate(${point.x} ${point.y}) rotate(${rotation})`;
  return (
    <g transform={transform}>

      <rect
        x={-size/2} y={-size/2}
        width={size} height={size}
        rx={size/6}  ry={size/6}
        fill={p.color}
        stroke={p.strokeWidth ? p.color : 'none'}
        strokeWidth={p.strokeWidth}
      />

      {p.children && 
        <StyledText
          x={1}
          y={4}
          dominantBaseline={'middle'}
          textAnchor={'middle'}
          color={p.color}
          parenthetical={p.isParenthetical}
        >
          {p.isParenthetical ? '(' : ''}
            {p.children}
          {p.isParenthetical ? ')' : ''}
        </StyledText>
      }

    </g>
  );
}
