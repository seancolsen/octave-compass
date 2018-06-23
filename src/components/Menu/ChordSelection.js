import React from "react";
import ChordChoices from "components/Menu/ChordChoices";
import ChordSet from "Utils/Music/ChordSet";
import styled from 'styled-components';
import Button from "components/common/Button";

const ButtonContainer = styled.div`
  text-align: center;
  & button {
    margin: 0.7vmax;
  }
`;

export default function ChordSelection(props) {
  const defaultChordsAreSelected =
    props.selectedChords.equals(ChordSet.fromDefaultChords);
  return (
    <div className={props.className}>
      <h2>Chords in scale</h2>
      <ButtonContainer>
        { defaultChordsAreSelected &&
          <Button
            onClick={e => props.setChordSet(ChordSet.fromAllChords)}
            icon='eye'
          >
            Show all
          </Button>
        }
        { !defaultChordsAreSelected &&
          <Button
            onClick={e => props.setChordSet(ChordSet.fromDefaultChords)}
            icon='undo'
          >
            Show default
          </Button>
        }
      </ButtonContainer>
      <ChordChoices
        selectedChords={props.selectedChords}
        toggleChord={props.toggleChord}
        intervalSet={props.intervalSet}
      />
    </div>
  );
}
