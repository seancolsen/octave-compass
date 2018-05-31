import React from "react";
import KeyLabel from "./KeyLabel";
import styled from "styled-components";
import Arc from "./Arc";

const spread = 0.20;
const tieRadius = 348;
const tieSpan = 0.2;
const tieWidth = 50;

const ActiveG = styled.g`
  opacity: 1;
  & * {
    cursor: pointer;
  }
  &:hover {
    filter: url('#playing-highlight');
  }
`;

const InactiveG = styled.g`
  opacity: 0.25;
  & * {
    cursor: grab;
  }
`;

const LabelTie = styled(Arc)`
  stroke: ${props => props.color};
  stroke-width: ${tieWidth}px;
`;

export default function KeyLabelSet(props) {

  const names = props.pitch.note.namesToUseForLabels;
  const nameCount = names.length;
  let result = [];

  let labelTie = null;
  if (nameCount > 1) {
    labelTie = <LabelTie
        startInterval={props.pitch.note.id - tieSpan}
        endInterval={props.pitch.note.id + tieSpan}
        color={props.pitch.note.color}
        radius={tieRadius}
      />;
  }

  names.forEach((name, index) => {
    const discreteWidth = nameCount - 1;
    const discreteOffset = (2 * index) - discreteWidth;
    const interval = props.pitch.note.id + (discreteOffset * spread);
    result.push(
      <KeyLabel
        key={index}
        interval={interval}
        rotation={props.rotation}
        color={props.pitch.note.color}
        active={props.active}
        parenthetical={nameCount > 1 && name.modifier.name === 'natural'}
      >
        {name.unicode}
      </KeyLabel>
    );
  });

  const G = props.active ? ActiveG : InactiveG;

  return (
    <G
      active={props.active}
      onMouseDown={e => props.playNotes ? props.playNotes([props.ordinal]) : ''}
    >
      {labelTie}
      <g>{result}</g>
    </G>
  );

}