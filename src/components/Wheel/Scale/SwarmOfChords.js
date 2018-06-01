import React from 'react';
import SliceOfChords from "components/Wheel/Scale/SliceOfChords";

export default function SwarmOfChords(props) {
  const chordSets = props.intervalSet.chordSets(props.selectedChords);
  return (
    <g>
      {
        chordSets.map((chordSet, index) =>
          <SliceOfChords
            key={index}
            chordSet={chordSet}
            rotation={props.rotation}
            somethingIsRotating={props.somethingIsRotating}
            playIntervals={props.playIntervals}
          />
        )
      }
    </g>

  );
}
