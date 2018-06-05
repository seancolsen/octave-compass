import React from 'react';
import ChordEmblem from "components/common/ChordEmblem";

export default function ChordIcon(props) {
  const size = 100;
  return (
    <svg
      viewBox={`-${size / 2} -${size / 2} ${size} ${size}`}
    >
      <ChordEmblem
        size={size / 2}
        chord={props.chord}
      />
    </svg>
  );
}
