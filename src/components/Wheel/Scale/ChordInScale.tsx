import React from 'react';
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

export function ChordInScale(props: Props) {

  type GenericEvent = React.MouseEvent | React.TouchEvent;
  const handleMouseDownOrTouchStart = (event: GenericEvent) => {
    event.preventDefault();
    const ordinalChord = new OrdinalChord(
      props.interval, props.chord
    );
    props.playOrdinalChord(ordinalChord);
    event.stopPropagation();
  }

  const transform = (() => {
    const point = new IrPoint(props.interval, props.radialPosition).toXy();
    const rotation = -Angle.iToD(props.rotation);
    return `translate(${point.x} ${point.y}) rotate(${rotation})`;
  })();

  const G = props.somethingIsRotating ? NonHighlightableG : HighlightableG;

  return (
    <G
      transform={transform}
      className={props.className}
      onMouseDown={e => handleMouseDownOrTouchStart(e)}
      onTouchStart={e => handleMouseDownOrTouchStart(e)}
      onTouchEnd={e => e.preventDefault()}
    >
      <Background cx={0} cy={0} r={props.size} />
      <ChordEmblem
        size={props.size}
        chord={props.chord}
      />
    </G>
  );

}
