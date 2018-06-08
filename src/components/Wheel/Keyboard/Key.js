import React, {Component} from 'react';
import Scalar from 'Utils/Math/Scalar';
import Polygon from 'components/Wheel/common/Polygon';
import IrPoint from "Utils/Geometry/IrPoint";
import styled from 'styled-components';
import KeyLabelSet from "components/Wheel/Keyboard/KeyLabelSet";

const innerRadius = 308;
const outerRadius = 400;

const Background = styled(Polygon)`
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
  &:hover > ${StyledKeyLabelSet} {
    filter: url('#playing-highlight');
    stroke: yellow;
    stroke-width: 2px;
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
    const shape = [
      [-0.5, outerRadius * Scalar.rFactorAtEdge],
      [0, outerRadius],
      [0.5, outerRadius * Scalar.rFactorAtEdge],
      [0.5, innerRadius * Scalar.rFactorAtEdge],
      [0, innerRadius],
      [-0.5, innerRadius * Scalar.rFactorAtEdge],
    ];
    const points = shape.map(ir =>
      IrPoint.fromArray(ir).plus({i: this.props.pitch.note.id})
    );
    const G = this.props.active ? ActiveG : InactiveG;
    return (
      <G
        onMouseDown={e => this.handleMouseDownOrTouchStart(e)}
        onTouchStart={e => this.handleMouseDownOrTouchStart(e)}
        onTouchEnd={e => e.preventDefault()}
      >
        <Background
          points={points}
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
