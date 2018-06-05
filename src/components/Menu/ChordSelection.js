import React from "react";
import ChordChoices from "components/Menu/ChordChoices";

export default function ChordSelection(props) {
  return (
    <div className={props.className}>
      <h2>Chords in scale</h2>
      <div>
        <button>Show all</button>
        <button>Hide all</button>
      </div>
      <ChordChoices
        selectedChords={props.selectedChords}
        toggleChord={props.toggleChord}
        intervalSet={props.intervalSet}
      />
    </div>
  );
}
