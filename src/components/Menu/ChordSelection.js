import React from "react";
import ChordChoices from "components/Menu/ChordChoices";
import ChordSet from "Utils/Music/ChordSet";

export default function ChordSelection(props) {
  return (
    <div className={props.className}>
      <h2>Chords in scale</h2>
      <div>
        <button onClick={e => props.setChordSet(ChordSet.fromAllChords)}>
          Show all
        </button>
        <button onClick={e => props.setChordSet(ChordSet.fromDefaultChords)}>
          Show default
        </button>
      </div>
      <ChordChoices
        selectedChords={props.selectedChords}
        toggleChord={props.toggleChord}
        intervalSet={props.intervalSet}
      />
    </div>
  );
}
