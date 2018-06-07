import React from 'react';
import Rotatable from "components/Wheel/Rotatable";
import SwarmOfChords from "components/Wheel/Scale/SwarmOfChords";
import Brand from "components/Wheel/Scale/Brand";
import IntervalSetPolygon from "components/common/IntervalSetPolygon";
import styled from "styled-components";
import OrdinalChordSet from "Utils/Music/OrdinalChordSet";
import ChordPolygons from "components/Wheel/Scale/ChordPolygons";

const Background = styled(IntervalSetPolygon)`
  fill: #E1E1E1;
  filter: url(#drop-shadow);
  stroke: #f7f7f7;
  stroke-width: 3px;
  cursor: grab;
`;

function Scale(props) {
  const ordinalChordSets = OrdinalChordSet.arrayFromIntervalSet(
    props.intervalSet,
    props.selectedChords
  );
  return (
    <g>
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

export default Rotatable(Scale);
