import React from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`
  text-align: center;
  padding: 0.5rem;
`;

const IntervalSetName = styled.span`
  font-weight: bold;
`;

const NoteName = styled.span`
  font-weight: bold;
`;

export default function Marquee(props) {
  const tonalCenter = props.noteSet.firstNote.namesToUseForLabels
    .map(name => name.unicode).join('/');
  return (
    <StyledDiv className={props.className}>
      <IntervalSetName>{props.intervalSet.name}</IntervalSetName>
      <span> in </span>
      <NoteName>
        {tonalCenter}
      </NoteName>
    </StyledDiv>
  );
}
