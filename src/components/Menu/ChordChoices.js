import React from "react";
import ChordChoice from "components/Menu/ChordChoice";
import styled from 'styled-components';
import Chord from "Utils/Music/Chord";
import ChordSet from "Utils/Music/ChordSet";

function ChordChoices(props) {
  const chordChoices = new ChordSet(Chord.allChords).chords.map(chord =>
    <ChordChoice
      key={chord.binary}
      chord={chord}
      toggleChord={props.toggleChord}
      selected={props.selectedChords.containsChord(chord)}
    />
  );
  return (
    <div className={props.className}>
      {chordChoices}
    </div>
  );
}

export default styled(ChordChoices)`
  display: flex;
  flex-wrap: wrap;
`;