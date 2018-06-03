import React from 'react';
import ChordSelection from "components/Menu/ChordSelection";

export default function Menu(props) {

  return (
    <div className={props.className} id='menu'>
      <ChordSelection
        chords={props.chords}
      />
    </div>
  );
}
