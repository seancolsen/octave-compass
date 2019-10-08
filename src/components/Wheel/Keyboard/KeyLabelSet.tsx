import React, {Component} from "react";
import styled, { StyledComponentClass, ThemedStyledFunction, StyledFunction } from "styled-components";
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

export class KeyLabelSet extends Component<KeyLabelSetProps> {

  /**
   * Return a LabelTie if needed
   */
  labelTie(nameCount: number): JSX.Element | null {
    if (nameCount < 2) {
      return null;
    }
    return <LabelTie 
      startInterval={this.props.pitch.note.id - tieSpan}
      endInterval={this.props.pitch.note.id + tieSpan}
      color={this.props.pitch.note.color}
      radius={tieRadius}
    />;
  }

  /**
   * Generate an array of KeyLabel objects from an array of NoteName objects.
   *
   * @param {NoteName[]} names
   * @return {KeyLabel[]}
   */
  labels(names: NoteName[]): JSX.Element[] {
    let result: JSX.Element[] = [];
    const nameCount = names.length;
    names.forEach((name, index) => {
      const discreteWidth = nameCount - 1;
      const discreteOffset = (2 * index) - discreteWidth;
      const interval = this.props.pitch.note.id + (discreteOffset * spread);
      result.push(
        <KeyLabel
          key={index}
          interval={interval}
          rotation={this.props.rotation}
          color={this.props.pitch.note.color}
          parenthetical={nameCount > 1 && name.modifier.name === 'natural'}
        >
          {name.unicode}
        </KeyLabel>
      );
    });
    return result;
  }

  render() {
    const names = this.props.pitch.note.namesToUseForLabels;
    return (
      <g className={this.props.className}>
        {this.labelTie(names.length)}
        <g>{this.labels(names)}</g>
      </g>
    );
  }

}
