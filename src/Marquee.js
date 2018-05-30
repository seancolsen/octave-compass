import React from 'react';
import styled from 'styled-components';
import AlternateScaleNames from "./AlternateScaleNames";

const DefaultName = styled.div`
  text-align: center;
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
  const defaultName = props.intervalSet.defaultName;
  return (
    <div className={props.className} id='marquee'>
      <DefaultName>
        {defaultName ?
          <IntervalSetName>{defaultName}</IntervalSetName> :
          <UnknownName>unknown scale</UnknownName>
        }
        <span> in </span>
        <NoteName>
          {tonalCenter}
        </NoteName>
        <span> ({props.intervalSet.binary})</span>
      </DefaultName>
      <AlternateScaleNames intervalSet={props.intervalSet}/>
    </div>
  );
}
