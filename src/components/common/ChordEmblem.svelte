<!-- import React from 'react';
import styled from 'styled-components';
import { Chord } from '../../Utils/Music/Chord';

const fontSizeToEmblemSizeRatio = 0.85;

const Background = styled.circle`
  fill: ${props => props.color || 'grey'};
`;

const StyledText = styled.text`
  fill: white;
  font-size: ${props => props.fontSize}px;
  tspan.bold {
    font-weight: bold;
  }
  tspan.italic {
    font-style: italic;
  }
`;

interface Props {
  size: number;
  chord: Chord;
  noteName?: string;
}

export function ChordEmblem(props: Props) {
  const fontSize = props.size * props.chord.textSizeFactor
      * fontSizeToEmblemSizeRatio;
  const noteName = props.noteName;
  // const EmblemContents = props.chord.EmblemContents;
  return (
    <>
      <Background
        cx={0} cy={0}
        r={props.size}
        color={props.chord.color}
      />
      <StyledText
        x={0} y={0}
        dominantBaseline={'middle'}
        textAnchor={'middle'}
        fontSize={fontSize}
      >
        {/* <EmblemContents noteName={noteName}/> */}
      </StyledText>
    </>
  );
} -->
