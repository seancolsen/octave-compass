<script lang="ts">

</script>

<!-- import React from "react";
import styled from 'styled-components';
import { ChordSet } from "../../Utils/Music/ChordSet";
import { ChordChoices } from "./ChordChoices";
import { useStore } from "../Store";
import { useObserver } from "mobx-react-lite";

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

interface Props {
  className?: string;
}

export function ChordSelection(props: Props) {
  const store = useStore();
  const defaultChordsAreSelected = useObserver(() =>
    store.selectedChords.equals(ChordSet.fromDefaultChords));
  return (
    <div className={props.className}>
      <Heading>
        <h2>Chords in scale</h2>
        { defaultChordsAreSelected &&
          <StyledA
            onClick={e => store.setSelectedChords(ChordSet.fromAllChords)}
          >
            show all
          </StyledA>
        }
        { !defaultChordsAreSelected &&
          <StyledA
            onClick={e => store.setSelectedChords(ChordSet.fromDefaultChords)}
          >
            Show default
          </StyledA>
        }
      </Heading>
      <ChordChoices/>
    </div>
  );
} -->
