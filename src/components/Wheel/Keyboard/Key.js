import React, {Component} from 'react';
import KeyPolygon from 'components/Wheel/Keyboard/common/KeyPolygon';
import styled from 'styled-components';
import KeyLabelSet from "components/Wheel/Keyboard/KeyLabelSet";

const StyledKeyPolygon = styled(KeyPolygon)`
  fill: ${p => p.active ? '#e1e1e1' : '#b7b7b7'};
  stroke: #a7a7a7;
  stroke-width: 3px;
`;

const InactiveG = styled.g`
  & * {
    cursor: grab;
  }
`;

const StyledKeyLabelSet = styled(KeyLabelSet)`
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

export default class Key extends Component {

  handleMouseDownOrTouchStart(event) {
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
          ordinal={this.props.ordinal}
          rotation={this.props.rotation}
          active={this.props.active}
          playNotes={this.props.playNotes}
        />
      </G>
    );
  }
}
