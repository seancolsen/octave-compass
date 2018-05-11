import React from "react";
import Key from "./Key";
import styled from 'styled-components';

const StyledG = styled.g`
  filter: ${props => props.active ? 'drop-shadow( 0 0 10px #000 )' : 'none'};
`;

export default function KeySet(props) {
  return (
    <StyledG active={props.active}>
      {
        props.noteSet.notes.map(note =>
          <Key
            key={note.id}
            note={note}
            rotation={props.rotation}
            active={props.active}
          />
        )
      }
    </StyledG>
  );
}
