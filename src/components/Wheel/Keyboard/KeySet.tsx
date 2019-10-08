import React from "react";
import styled from 'styled-components';
import { KeyPolygon } from "./common/KeyPolygon";
import { PitchSet } from "../../../Utils/Music/PitchSet";
import { Key } from "./Key";

const KeyShadow = styled(KeyPolygon)`
  fill: #000;
  stroke: #000;
  stroke-width: 6px;
  filter: url('#blur');
`;

interface Props {
  pitchSet: PitchSet;
  active: boolean;
  rotation: number;
  playNotes(n: number[]): void;
}

export function KeySet(props: Props) {
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
