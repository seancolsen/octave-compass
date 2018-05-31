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
  return (
    <div className={props.className} id='marquee'>
      <DefaultName>
        {props.intervalSet.defaultName ?
          <IntervalSetName>{props.intervalSet.defaultName}</IntervalSetName> :
          <UnknownName>{props.intervalSet.displayName}</UnknownName>
        }
        <span> in </span>
        <NoteName>{props.noteSet.tonalCenterName}</NoteName>
      </DefaultName>
      <AlternateScaleNames intervalSet={props.intervalSet}/>
    </div>
  );
}
