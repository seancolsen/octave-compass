import React from "react";
import Key from "components/Wheel/Keyboard/Key";
import styled from 'styled-components';
import KeyPolygon from "components/Wheel/Keyboard/common/KeyPolygon";

const KeyShadow = styled(KeyPolygon)`
  fill: #000;
  stroke: #000;
  stroke-width: 6px;
  filter: url('#blur');
`;

export default function KeySet(props) {
  const pitches = props.pitchSet.pitches;
  const keyShadows = props.active && pitches.map(pitch =>
    <KeyShadow key={pitch.note.id} pitch={pitch} />
  );
  const keys = pitches.map(pitch =>
    <Key
      key={pitch.note.id}
      pitch={pitch}
      rotation={props.rotation}
      active={props.active}
      playNotes={props.playNotes}
    />
  );

  return (
    <g>
      <g>{keyShadows}</g>
      <g>{keys}</g>
    </g>
  );
}
