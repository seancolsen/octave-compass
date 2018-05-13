import React from 'react';
import SliceOfChords from "./SliceOfChords";
import IntervalSetFactory from "./Utils/IntervalSetFactory";

export default function SwarmOfChords(props) {
  const chordSets = IntervalSetFactory.chordSets(
    props.intervalSet, props.selectedChords
  );
  return (
    <g>
      {
        chordSets.map((chordSet, index) =>
          <SliceOfChords
            key={index}
            chordSet={chordSet}
          />
        )
      }
    </g>

  );
}
