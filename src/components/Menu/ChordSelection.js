import React from "react";
import ChordChoices from "components/Menu/ChordChoices";
import ChordSet from "Utils/Music/ChordSet";
import styled from 'styled-components';
import Button from "components/common/Button";

const Heading = styled.div`
  display: flex;
  align-items: baseline;
  align-content: center;
  justify-content: center;
  flex-wrap: wrap;
  & > * {
    margin: 0 1vmax 0.5vmax 1vmax;
  }
`;

const StyledA = styled.a`
  font-style: italic;
`;

export default function ChordSelection(props) {
  const defaultChordsAreSelected =
    props.selectedChords.equals(ChordSet.fromDefaultChords);
  return (
    <div className={props.className}>
      <Heading>
        <h2>Chords in scale</h2>
        { defaultChordsAreSelected &&
          <StyledA
            onClick={e => props.setChordSet(ChordSet.fromAllChords)}
          >
            show all
          </StyledA>
        }
        { !defaultChordsAreSelected &&
          <StyledA
            onClick={e => props.setChordSet(ChordSet.fromDefaultChords)}
          >
            Show default
          </StyledA>
        }
      </Heading>
      <ChordChoices
        selectedChords={props.selectedChords}
        toggleChord={props.toggleChord}
        intervalSet={props.intervalSet}
      />
    </div>
  );
}
