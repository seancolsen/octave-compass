import React from 'react';
import styled from "styled-components";
import { IntervalSetPolygon, IntervalSetPolygonProps } from '../common/IntervalSetPolygon';
import { OrdinalChordSet } from '../../Utils/Music/OrdinalChordSet';
import { Brand } from './Scale/Brand';
import { ChordPolygons } from './Scale/ChordPolygons';
import { SwarmOfChords } from './Scale/SwarmOfChords';
import { IntervalSet } from '../../Utils/Music/IntervalSet';
import { ChordSet } from '../../Utils/Music/ChordSet';
import { OrdinalChord } from '../../Utils/Music/OrdinalChord';
import { ObjectLog } from '../../Utils/Misc/ObjectLog';

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
  intervalSet: IntervalSet;
  selectedChords: ChordSet;
  rotation: number;
  ordinalChordsPlayed: ObjectLog<OrdinalChord>;
  somethingIsRotating: boolean;
  playOrdinalChord(oc: OrdinalChord): void;
}

export default function Scale(props: Props) {
  const ordinalChordSets = OrdinalChordSet.arrayFromIntervalSet(
    props.intervalSet,
    props.selectedChords
  );
  return (
    <g>
      <Shadow intervalSet={props.intervalSet}/>
      <Background intervalSet={props.intervalSet}/>
      <Brand rotation={props.rotation}/>
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
