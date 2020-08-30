import React from 'react';
import { SliceOfChords } from './SliceOfChords';
import { OrdinalChordSet } from '../../../Utils/Music/OrdinalChordSet';

interface Props {
  ordinalChordSets: OrdinalChordSet[];
  rotation: number;
}

export function SwarmOfChords(props: Props) {
    const slices = props.ordinalChordSets.map((ordinalChordSet, index) =>
    <SliceOfChords
      key={index}
      chordSet={ordinalChordSet.chordSet}
      ordinal={ordinalChordSet.ordinal}
      rotation={props.rotation}
    />
  );
  return <g style={{filter: 'url(#shadow-when-play)'}}>{slices}</g>;
}
