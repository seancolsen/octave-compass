import React from 'react';
import styled from "styled-components";
import { IntervalSetPolygon, IntervalSetPolygonProps } from '../common/IntervalSetPolygon';
import { OrdinalChordSet } from '../../Utils/Music/OrdinalChordSet';
import { SwarmOfChords } from './Scale/SwarmOfChords';
import { useStore } from '../Store';
import { observer } from 'mobx-react-lite';

const Shadow = styled(IntervalSetPolygon)<IntervalSetPolygonProps>`
  fill: black;
  stroke: black;
  stroke-width: 3px;
  filter: url(#blur);
`;

const Background = styled(IntervalSetPolygon)<IntervalSetPolygonProps>`
  fill: #E1E1E1;
  stroke: #f7f7f7;
  stroke-width: 3px;
  cursor: grab;
`;

interface Props {
  rotation: number;
  somethingIsRotating: boolean;
}

export const ScaleComponent = observer((props: Props) => {
  const store = useStore();
  const ordinalChordSets = OrdinalChordSet.arrayFromIntervalSet(
    store.intervalSet,
    store.selectedChords
  );
  return (
    <g>
      <Shadow intervalSet={store.intervalSet}/>
      <Background intervalSet={store.intervalSet}/>
      {/* <ChordPolygons
        ordinalChordsPlayed={props.ordinalChordsPlayed}
        rotation={props.rotation}
        // TODO replace this with lighting
      /> */}
      <SwarmOfChords
        ordinalChordSets={ordinalChordSets}
        rotation={props.rotation}
        somethingIsRotating={props.somethingIsRotating}
      />
    </g>
  );
});
