import React from 'react';
import IrPoint from "./Utils/IrPoint";
import styled from 'styled-components';

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
  return (
    <g>
      <Background
        cx={point.x} cy={point.y}
        r={props.size}
        color={props.chord.color}
      />
      <Symbol
        x={point.x} y={point.y}
        dangerouslySetInnerHTML={{__html: props.chord.symbol}}
        dominantBaseline={'middle'} // TODO address lack of IE support
        textAnchor={'middle'}
      />
    </g>
  );
}
