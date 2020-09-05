<script lang="ts">

</script>

<!-- import React from "react";
import styled from "styled-components";
import { Arc } from "../common/Arc";
import { Pitch } from "../../../Utils/Music/Pitch";
import { KeyLabel } from './KeyLabel';
import { useStore } from "../../Store";

const highlightColor = '#fffa58';

export interface KeyLabelSetProps {
  pitch: Pitch;
  rotation: number;
  /**
   * True when we're rendering the blurred yellow highlight that goes behind the
   * actual labels.
   */
  isHighlight: boolean;
  className?: string;
}

export function KeyLabelSet(p: KeyLabelSetProps) {
  const store = useStore();
  const names = p.pitch.note.namesToUseForLabels;
  const spread = 0.20;
  const radius = 348 + store.editVsPlay * 20;
  const tieSpan = 0.2;
  const tieWidth = 50;
  const color = p.isHighlight ? highlightColor : p.pitch.note.color;
  const StyledArc = styled(Arc)<{color: string}>`
    stroke: ${p => p.color};
    stroke-width: ${tieWidth}px;
  `;

  const labelTie = names.length < 2 ? null: <StyledArc
    startInterval={p.pitch.note.id - tieSpan}
    endInterval={p.pitch.note.id + tieSpan}
    color={color}
    radius={radius}
  />;

  const keyLabels = (() => {
    let keyLabels: JSX.Element[] = [];
    const nameCount = names.length;
    names.forEach((name, index) => {
      const discreteWidth = nameCount - 1;
      const discreteOffset = (2 * index) - discreteWidth;
      const interval = p.pitch.note.id + (discreteOffset * spread);
      keyLabels.push(
        <KeyLabel
          radius={radius}
          key={index}
          interval={interval}
          rotation={p.rotation}
          color={color}
          isParenthetical={nameCount > 1 && name.modifier.name === 'natural'}
          strokeWidth={p.isHighlight ? 35 : 0}
        >
          {p.isHighlight ? undefined : name.unicode}
        </KeyLabel>
      );
    });
    return <>{keyLabels}</>;
  })();
  
  return (
    <g
      className={p.className}
      filter={p.isHighlight ? "url('#blur')" : 'none'}
    >
      {labelTie}
      <g>{keyLabels}</g>
    </g>
  );

} -->
