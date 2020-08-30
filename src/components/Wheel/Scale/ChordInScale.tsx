import React from 'react';
import styled from 'styled-components';
import { OrdinalChord } from '../../../Utils/Music/OrdinalChord';
import { Chord } from '../../../Utils/Music/Chord';
import { IrPoint } from '../../../Utils/Geometry/IrPoint';
import { Angle } from '../../../Utils/Geometry/Angle';
import { ChordEmblem } from '../../common/ChordEmblem';
import { useStore } from '../../Store';
import { observer } from 'mobx-react-lite';

const Background = styled.circle`
  stroke: #e1e1e1;
  stroke-width: 5px;
`;

const ClickableG = styled.g`
  & * {
    cursor: pointer;
  }
  &:hover ${Background} {
    stroke: white;
    stroke-width: 15px;
  }
`;

const NonClickableG = styled.g`
  & * {
    cursor: grab;
  }
`;

interface Props {
  interval: number;
  chord: Chord;
  radialPosition: number;
  rotation: number;
  className?: string;
  size: number;
}

export const ChordInScale = observer((props: Props) => {
  const store = useStore();

  type GenericEvent = React.MouseEvent | React.TouchEvent;
  const handleMouseDownOrTouchStart = (event: GenericEvent) => {
    event.preventDefault();
    const ordinalChord = new OrdinalChord(
      props.interval, props.chord
    );
    store.playOrdinalChord(ordinalChord);
    event.stopPropagation();
  }

  const transform = (() => {
    const point = new IrPoint(props.interval, props.radialPosition).toXy();
    const rotation = -Angle.iToD(props.rotation);
    return `translate(${point.x} ${point.y}) rotate(${rotation})`;
  })();

  const G = store.editVsPlay ? ClickableG : NonClickableG;

  return (
    <G
      transform={transform}
      className={props.className}
      onMouseDown={store.editVsPlay ? handleMouseDownOrTouchStart : undefined}
      onTouchStart={store.editVsPlay ? handleMouseDownOrTouchStart : undefined}
      onTouchEnd={store.editVsPlay ? e => e.preventDefault() : undefined}
    >
      <Background cx={0} cy={0} r={props.size} />
      <ChordEmblem
        size={props.size}
        chord={props.chord}
      />
    </G>
  );

})
