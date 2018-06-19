import React, {Component} from 'react';
import IrPoint from "Utils/Geometry/IrPoint";
import styled from 'styled-components';
import Angle from "Utils/Geometry/Angle";
import ChordEmblem from "components/common/ChordEmblem";
import OrdinalChord from "Utils/Music/OrdinalChord";

const Background = styled.circle`
    stroke: #e1e1e1;
    stroke-width: 5px;
`;

const HighlightableG = styled.g`
  & * {
    cursor: pointer;
  }
  &:hover ${Background} {
    stroke: white;
    stroke-width: 15px;
  }
`;

const NonHighlightableG = styled.g`
  & * {
    cursor: grab;
  }
`;

export default class ChordInScale extends Component {

  handleMouseDownOrTouchStart(event) {
    event.preventDefault();
    const ordinalChord = new OrdinalChord(
      this.props.interval, this.props.chord
    );
    this.props.playOrdinalChord(ordinalChord);
    event.stopPropagation();
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
        onMouseDown={e => this.handleMouseDownOrTouchStart(e)}
        onTouchStart={e => this.handleMouseDownOrTouchStart(e)}
        onTouchEnd={e => e.preventDefault()}
      >
        <Background cx={0} cy={0} r={this.props.size} />
        <ChordEmblem
          size={this.props.size}
          chord={this.props.chord}
        />
      </G>
    );
  }

}
