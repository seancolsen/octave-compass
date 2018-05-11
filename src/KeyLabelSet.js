import React from "react";
import KeyLabel from "./KeyLabel";
import styled from "styled-components";
import Arc from "./Arc";

const spread = 0.20;
const tieRadius = 320;
const tieSpan = 0.2;
const tieWidth = 50;

const DoubleLabelTie = styled(Arc)`
  stroke: ${props => props.color};
  stroke-width: ${tieWidth}px;
`;

export default function KeyLabelSet(props) {

  const names = props.note.namesToUseForLabels;
  const nameCount = names.length;
  let result = [];

  if (nameCount > 1) {
    result.push(
      <DoubleLabelTie
        startInterval={props.note.id - tieSpan}
        endInterval={props.note.id + tieSpan}
        color={props.note.color}
        radius={tieRadius}
      />
    );
  }

  names.forEach((name, index) => {
    const discreteWidth = nameCount - 1;
    const discreteOffset = (2 * index) - discreteWidth;
    const interval = props.note.id + (discreteOffset * spread);
    result.push(
      <KeyLabel
        key={index}
        interval={interval}
        rotation={props.rotation}
        color={props.note.color}
        active={props.active}
      >
        {name.unicode}
      </KeyLabel>
    );
  });

  return (result);

}