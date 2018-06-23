import React from 'react';
import TwoWayButton from "components/common/TwoWayButton";
import styled from 'styled-components';

const StyledTwoWayButton = styled(TwoWayButton)`
  margin: 0.5vmax;
`;

const StyledDiv = styled.div`
  text-align: center;
`;

export default function Toolbar(props) {
  return (
    <StyledDiv>
      <StyledTwoWayButton
        label='Transpose'
        stepFunction={props.shiftTonalCenter}
        buttonLabels={['down', 'up']}
        icons={['minus', 'plus']}
      />
      <StyledTwoWayButton
        label='Mode'
        stepFunction={props.shiftIntervalSet}
        buttonLabels={['prev', 'next']}
        icons={['caret-left', 'caret-right']}
      />
    </StyledDiv>
  );
}

