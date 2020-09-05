<script lang="ts">

</script>

<!-- import React from "react";
import { PitchSet } from "../../../Utils/Music/PitchSet";
import { Key } from "./Key";

interface Props {
  pitchSet: PitchSet;
  active: boolean;
  rotation: number;
}

export function KeySet(props: Props) {
  const pitches = props.pitchSet.pitches;
  const keys = pitches.map(pitch =>
    <Key
      key={pitch.note.id}
      pitch={pitch}
      rotation={props.rotation}
      active={props.active}
    />
  );
  const filter = props.active ? "url('#shadow-when-play')" : undefined;
  return <g filter={filter}>{keys}</g>;
} -->
