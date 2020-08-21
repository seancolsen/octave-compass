import React from 'react';
import styled from 'styled-components';

const StyledText = styled.text`
    font-size: 30px;
  `;
  
interface Props {
  currentDetent: number | null,
}
  
export const ModeShiftHelpText = (props: Props) => {
  return (
    <StyledText
      x={0}
      y={0}
      textAnchor={'middle'}
    >Shift {props.currentDetent}
    </StyledText>
  );
}
