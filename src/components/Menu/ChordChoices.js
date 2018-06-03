import React from "react";
import ChordChoice from "components/Menu/ChordChoice";
import styled from 'styled-components';
import Chord from "Utils/Music/Chord";

function ChordChoices(props) {
  // TODO compare chord to props.selectedChords
  const chordChoices = Chord.allChords.map(chord =>
    <ChordChoice
      key={chord.binary}
      chord={chord}
      toggleChord={props.toggleChord}
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