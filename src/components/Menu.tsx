import React from 'react';
import styled from 'styled-components';
import { ChordSelection } from './Menu/ChordSelection';

const StyledDiv = styled.div`
overflow: scroll;
`;

interface Props {
  className?: string;
}

export function Menu(props: Props) {
  return (
    <StyledDiv className={props.className} id='menu'>
      <ChordSelection/>
    </StyledDiv>
  );
}