import React from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`
  text-align: center;
  padding: 0.5rem;
`;

const IntervalSetName = styled.span`
  font-weight: bold;
`;

const UnknownName = styled.span`
  font-style: italic;
`;

const NoteName = styled.span`
  font-weight: bold;
`;

export default function Marquee(props) {
  const tonalCenter = props.noteSet.firstNote.namesToUseForLabels
    .map(name => name.unicode).join('/');
  const name = props.intervalSet.names.join(" / ");
  return (
    <StyledDiv className={props.className}>
      {name ?
        <IntervalSetName>{name}</IntervalSetName> :
        <UnknownName>unknown scale</UnknownName>
      }
      <span> in </span>
      <NoteName>
        {tonalCenter}
      </NoteName>
      <span> ({props.intervalSet.binary})</span>
    </StyledDiv>
  );
}
