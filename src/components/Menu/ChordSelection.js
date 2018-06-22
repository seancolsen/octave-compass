import React from "react";
import ChordChoices from "components/Menu/ChordChoices";
import ChordSet from "Utils/Music/ChordSet";
import styled from 'styled-components';

const ButtonContainer = styled.div`
  text-align: center;
  & button {
    margin: 0.7vmax;
  }
`;

export default function ChordSelection(props) {
  return (
    <div className={props.className}>
      <h2>Chords in scale</h2>
      <ButtonContainer>
        <button onClick={e => props.setChordSet(ChordSet.fromAllChords)}>
          Show all
        </button>
        <button onClick={e => props.setChordSet(ChordSet.fromDefaultChords)}>
          Show default
        </button>
      </ButtonContainer>
      <ChordChoices
        selectedChords={props.selectedChords}
        toggleChord={props.toggleChord}
        intervalSet={props.intervalSet}
      />
    </div>
  );
}
