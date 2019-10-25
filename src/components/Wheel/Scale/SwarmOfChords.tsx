import React from 'react';
import { SliceOfChords } from './SliceOfChords';
import { OrdinalChordSet } from '../../../Utils/Music/OrdinalChordSet';

interface Props {
  ordinalChordSets: OrdinalChordSet[];
  rotation: number;
  somethingIsRotating: boolean;
}

export function SwarmOfChords(props: Props) {
    const slices = props.ordinalChordSets.map((ordinalChordSet, index) =>
    <SliceOfChords
      key={index}
      chordSet={ordinalChordSet.chordSet}
      ordinal={ordinalChordSet.ordinal}
      rotation={props.rotation}
      somethingIsRotating={props.somethingIsRotating}
    />
  );
  return <g>{slices}</g>;
}
