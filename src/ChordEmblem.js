import React from 'react';
import IrPoint from "./Utils/IrPoint";
import styled from 'styled-components';
import Angle from "./Utils/Angle";

const Background = styled.circle`
  fill: ${props => props.color || 'grey'};
`;

const Symbol = styled.text`
  fill: white;
  font-size: 25px;
  tspan.bold {
    font-weight: bold;
  }
  tspan.italic {
    font-style: italic;
  }
`;

export default function ChordEmblem(props) {
  const point = new IrPoint(props.interval, props.radialPosition).toXy();
  const rotation = -Angle.iToD(props.rotation);
  let transform = `translate(${point.x} ${point.y}) rotate(${rotation})`;
  return (
    <g transform={transform}>
      <Background
        cx={0} cy={0}
        r={props.size}
        color={props.chord.color}
      />
      <Symbol
        x={0} y={0}
        dangerouslySetInnerHTML={{__html: props.chord.symbol}}
        dominantBaseline={'middle'} // TODO address lack of IE support
        textAnchor={'middle'}
      />
    </g>
  );
}
