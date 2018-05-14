import React from 'react';
import styled from 'styled-components';

const DefaultName = styled.div`
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

const AlternateNames = styled(DefaultName)`
  font-size: 75%;
  font-style: italic;
  height: 1em;
`;

const Aka = styled.span`
  color: #333;
`;

function Marquee(props) {
  const tonalCenter = props.noteSet.firstNote.namesToUseForLabels
    .map(name => name.unicode).join('/');
  const alternateNames = props.intervalSet.alternateNames;
  const alternateNamesString = alternateNames ? alternateNames.join(", ") : '';
  const defaultName = props.intervalSet.defaultName;
  return (
    <div className={props.className}>
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
      <AlternateNames>
        {alternateNamesString ?
          [<Aka>Also know as: </Aka>,
          <span>{alternateNamesString}</span>]
          : ""
        }
      </AlternateNames>
    </div>
  );
}

export default styled(Marquee)`
  margin-bottom: 1em;
`;
