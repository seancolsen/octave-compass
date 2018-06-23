import React from "react";
import ChordChoices from "components/Menu/ChordChoices";
import ChordSet from "Utils/Music/ChordSet";
import styled from 'styled-components';
import Button from "components/common/Button";

const Heading = styled.div`
  display: grid;
  grid: 1fr / auto auto;
  grid-gap: 2vmax;
  align-items: start;
  justify-content: center;
`;

export default function ChordSelection(props) {
  const defaultChordsAreSelected =
    props.selectedChords.equals(ChordSet.fromDefaultChords);
  return (
    <div className={props.className}>
      <Heading>
        <h2>Chords in scale</h2>
        { defaultChordsAreSelected &&
          <Button
            onClick={e => props.setChordSet(ChordSet.fromAllChords)}
            icon='eye'
          >
            show all
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
      </Heading>
      <ChordChoices
        selectedChords={props.selectedChords}
        toggleChord={props.toggleChord}
        intervalSet={props.intervalSet}
      />
    </div>
  );
}
