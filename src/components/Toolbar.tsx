import React from 'react';
import styled from 'styled-components';

const FlexContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const OuterContainer = styled(FlexContainer)`
  height: 100%;
`;

const InnerContainer = styled(FlexContainer)<{wrap?: string}>`
  flex-wrap: ${p => p.wrap || 'nowrap'};
  & > * {
    margin: 0.7vmax 0.7vmax;
  }
`;

interface Props {
  buttons: {
    Staff: React.FunctionComponent,
    Transpose: React.FunctionComponent,
    Mode: React.FunctionComponent,
    About: React.FunctionComponent,
  }
}

export function Toolbar(props: Props) {
  const {Staff, Transpose, Mode, About} = props.buttons;
  return (
    <div id='toolbar'>
      <OuterContainer>
        <InnerContainer wrap='wrap-reverse'>
          <Staff />
          <Transpose />
        </InnerContainer>
        <InnerContainer wrap='wrap'>
          <Mode />
          <About />
        </InnerContainer>
      </OuterContainer>
    </div>
  );
}
