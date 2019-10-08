import React, {Component} from 'react';
import styled from 'styled-components';
import { KeyPolygon, KeyPolygonProps } from './common/KeyPolygon';
import { KeyLabelSet, KeyLabelSetProps } from './KeyLabelSet';
import { Pitch } from '../../../Utils/Music/Pitch';

const StyledKeyPolygon = styled(KeyPolygon)<
  {active: boolean} & KeyPolygonProps
>`
  fill: ${p => p.active ? '#e1e1e1' : '#b7b7b7'};
  stroke: #a7a7a7;
  stroke-width: 3px;
`;

const InactiveG = styled.g`
  & * {
    cursor: grab;
  }
`;

const StyledKeyLabelSet = styled(KeyLabelSet)<
  {active: boolean} & KeyLabelSetProps
>`
opacity: ${p => p.active ? '1' : '0.25'};
`;

const ActiveG = styled.g`
  & * {
    cursor: pointer;
  }
  &:hover > ${StyledKeyPolygon} {
    fill: #f2f2d2;
  }
`;

interface KeyProps {
  pitch: Pitch;
  active: boolean;
  playNotes(n: number[]): void;
  rotation: number;
}

export class Key extends Component<KeyProps> {

  handleMouseDownOrTouchStart(event: React.MouseEvent | React.TouchEvent) {
    event.preventDefault();
    if (!this.props.playNotes) {
      return;
    }
    this.props.playNotes([this.props.pitch.note.id]);
    event.stopPropagation();
  }

  render() {
    const G = this.props.active ? ActiveG : InactiveG;
    return (
      <G
        onMouseDown={e => this.handleMouseDownOrTouchStart(e)}
        onTouchStart={e => this.handleMouseDownOrTouchStart(e)}
        onTouchEnd={e => e.preventDefault()}
      >
        <StyledKeyPolygon
          pitch={this.props.pitch}
          active={this.props.active}
        />
        <StyledKeyLabelSet
          pitch={this.props.pitch}
          rotation={this.props.rotation}
          active={this.props.active}
          // TODO: Remove these lines if everything is working okay.
          // I commented these out when converting to Typescript, and it seems
          // like probably these lines are unnecessary. 
          // ordinal={this.props.ordinal}
          // playNotes={this.props.playNotes}
        />
      </G>
    );
  }
}
