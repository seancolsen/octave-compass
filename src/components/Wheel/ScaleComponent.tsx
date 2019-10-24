import React from 'react';
import styled from "styled-components";
import { IntervalSetPolygon, IntervalSetPolygonProps } from '../common/IntervalSetPolygon';
import { OrdinalChordSet } from '../../Utils/Music/OrdinalChordSet';
import { ChordPolygons } from './Scale/ChordPolygons';
import { SwarmOfChords } from './Scale/SwarmOfChords';
import { OrdinalChord } from '../../Utils/Music/OrdinalChord';
import { ObjectLog } from '../../Utils/Misc/ObjectLog';
import { StoreContext } from '../Store';

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
  ordinalChordsPlayed: ObjectLog<OrdinalChord>;
  somethingIsRotating: boolean;
  playOrdinalChord(oc: OrdinalChord): void;
}

export function ScaleComponent(props: Props) {
  const store = React.useContext(StoreContext);
  const ordinalChordSets = OrdinalChordSet.arrayFromIntervalSet(
    store.intervalSet,
    store.selectedChords
  );
  return (
    <g>
      <Shadow intervalSet={store.intervalSet}/>
      <Background intervalSet={store.intervalSet}/>
      <ChordPolygons
        ordinalChordsPlayed={props.ordinalChordsPlayed}
        rotation={props.rotation}
      />
      <SwarmOfChords
        ordinalChordSets={ordinalChordSets}
        rotation={props.rotation}
        somethingIsRotating={props.somethingIsRotating}
        playOrdinalChord={props.playOrdinalChord}
      />
    </g>
  );
}
