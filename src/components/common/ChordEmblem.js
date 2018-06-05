import React, {Fragment} from 'react';
import styled from 'styled-components';

const fontSizeToEmblemSizeRatio = 0.85;

const Background = styled.circle`
  fill: ${props => props.color || 'grey'};
`;

const Symbol = styled.text`
  fill: white;
  font-size: ${props => props.fontSize}px;
  tspan.bold {
    font-weight: bold;
  }
  tspan.italic {
    font-style: italic;
  }
`;

export default function ChordEmblem(props) {
  const fontSize = props.size * props.chord.textSizeFactor
      * fontSizeToEmblemSizeRatio;
  return (
    <Fragment>
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
        fontSize={fontSize}
      />
    </Fragment>
  );
}
