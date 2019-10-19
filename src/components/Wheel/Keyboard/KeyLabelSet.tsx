import React from "react";
import styled from "styled-components";
import { Arc, ArcProps } from "../common/Arc";
import { Pitch } from "../../../Utils/Music/Pitch";
import { NoteName } from "../../../Utils/Music/NoteName";
import { KeyLabel } from './KeyLabel';

const spread = 0.20;
const tieRadius = 348;
const tieSpan = 0.2;
const tieWidth = 50;

type LabelTieProps = {color: string} & ArcProps;

const LabelTie = styled(Arc)<LabelTieProps>`
  stroke: ${props => props.color};
  stroke-width: ${tieWidth}px;
`;

export interface KeyLabelSetProps {
  className?: string;
  pitch: Pitch;
  rotation: number;
}

export function KeyLabelSet(props: KeyLabelSetProps) {

  /**
   * Return a LabelTie if needed
   */
  const labelTie = (nameCount: number): JSX.Element | null => {
    if (nameCount < 2) {
      return null;
    }
    return <LabelTie 
      startInterval={props.pitch.note.id - tieSpan}
      endInterval={props.pitch.note.id + tieSpan}
      color={props.pitch.note.color}
      radius={tieRadius}
    />;
  }

  /**
   * Generate an array of KeyLabel objects from an array of NoteName objects.
   */
  const labels = (names: NoteName[]): JSX.Element[] => {
    let result: JSX.Element[] = [];
    const nameCount = names.length;
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
          parenthetical={nameCount > 1 && name.modifier.name === 'natural'}
        >
          {name.unicode}
        </KeyLabel>
      );
    });
    return result;
  }

  const names = props.pitch.note.namesToUseForLabels;
  
  return (
    <g className={props.className}>
      {labelTie(names.length)}
      <g>{labels(names)}</g>
    </g>
  );

}
