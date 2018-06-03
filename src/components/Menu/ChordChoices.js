import React from "react";
import ChordChoice from "components/Menu/ChordChoice";
import styled from 'styled-components';

function ChordChoices(props) {
  const chordChoices = props.chords.map(chord =>
    <ChordChoice
      key={chord.binary}
      chord={chord}
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