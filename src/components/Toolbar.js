import React from 'react';
import styled from 'styled-components';

const FlexContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1vmax 0;
  & > * {
    margin: 0 0.7vmax;
  }
`;

export default function Toolbar(props) {
  const {Staff,  Transpose,  Mode,  About} = props.buttons;
  return (
    <div id='toolbar'>
      <FlexContainer>
        <Staff />
        <Transpose />
        <Mode />
        <About />
      </FlexContainer>
    </div>
  );
}

