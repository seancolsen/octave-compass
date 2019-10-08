import React, {Component} from 'react';
import styled from 'styled-components';
import { OrdinalChord } from '../../../Utils/Music/OrdinalChord';
import { Chord } from '../../../Utils/Music/Chord';
import { IrPoint } from '../../../Utils/Geometry/IrPoint';
import { Angle } from '../../../Utils/Geometry/Angle';
import { ChordEmblem } from '../../common/ChordEmblem';

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

interface Props {
  interval: number;
  chord: Chord;
  radialPosition: number;
  rotation: number;
  somethingIsRotating: boolean;
  className?: string;
  size: number;
  playOrdinalChord(oc: OrdinalChord): void;
}

export class ChordInScale extends Component<Props> {

  handleMouseDownOrTouchStart(event: React.MouseEvent | React.TouchEvent) {
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
