import React, {Component} from 'react';
import IrPoint from "Utils/Geometry/IrPoint";
import styled from 'styled-components';
import Angle from "Utils/Geometry/Angle";
import ChordEmblem from "components/common/ChordEmblem";

const fontSizeToEmblemSizeRatio = 0.85;

const HighlightableG = styled.g`
  & * {
    cursor: pointer;
  }
  &:hover circle {
    filter: url('#playing-highlight');
    stroke: yellow;
    stroke-width: 2px;
  }
`;

const NonHighlightableG = styled.g`
  & * {
    cursor: grab;
  }
`;

export default class ChordInScale extends Component {

  handleMouseDown(e) {
    const shiftedChord = this.props.chord.shift(this.props.interval);
    this.props.playIntervals(shiftedChord.ordinals);
  }

  render() {
    const point = new IrPoint(this.props.interval, this.props.radialPosition)
      .toXy();
    const rotation = -Angle.iToD(this.props.rotation);
    let transform = `translate(${point.x} ${point.y}) rotate(${rotation})`;
    const G = this.props.somethingIsRotating ?
      NonHighlightableG : HighlightableG;
    return (
      <G
        transform={transform}
        className={this.props.className}
        onMouseDown={e => this.handleMouseDown(e)}
      >
        <ChordEmblem
          size={this.props.size}
          chord={this.props.chord}
        />
      </G>
    );
  }

}
