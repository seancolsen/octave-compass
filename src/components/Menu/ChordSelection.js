import React from "react";
import ChordChoices from "components/Menu/ChordChoices";

export default function ChordSelection(props) {
  return (
    <div className={props.className}>
      <h2>Chords</h2>
      <ChordChoices
        chords={props.chords}
      />
    </div>
  );
}
