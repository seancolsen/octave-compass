<script lang="ts">

</script>

<!-- import React from 'react';
import styled from "styled-components";
import { ObjectLog } from '../../../Utils/Misc/ObjectLog';
import { OrdinalChord } from '../../../Utils/Music/OrdinalChord';
import { ChordPolygon } from './ChordPolygons/ChordPolygon';
import { Angle } from '../../../Utils/Geometry/Angle';

const StyledG = styled.g`
  & * {
    cursor: grab;
  }
`;

interface Props {
  rotation: number;
  radius: number;
  ordinalChordsPlayed: ObjectLog<OrdinalChord>;
}

export function ChordPolygons(props: Props) {
  let transform = `rotate(${-Angle.iToD(props.rotation)})`;
  return (
    <StyledG transform={transform}>
      {[...props.ordinalChordsPlayed.log].map(([key, ordinalChord]) =>
        <ChordPolygon
          key={key}
          ordinalChord={ordinalChord}
          radius={props.radius}
        />
      )}
    </StyledG>
  )
} -->
