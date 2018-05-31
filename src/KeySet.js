import React from "react";
import Key from "./Key";
import styled from 'styled-components';

const StyledG = styled.g`
  filter: ${props => props.active ? 'url(#drop-shadow)' : 'none'};
`;

export default function KeySet(props) {
  return (
    <StyledG active={props.active}>
      {
        props.pitchSet.pitches.map(pitch =>
          <Key
            key={pitch.note.id}
            pitch={pitch}
            rotation={props.rotation}
            active={props.active}
            playNotes={props.playNotes}
          />
        )
      }
    </StyledG>
  );
}
