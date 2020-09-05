<script lang="ts">

</script>

<!-- import React from 'react';

interface Props {
  bounds?: number;
  id: string;
  blurRadius: number;
  opacity?: number;
  offsetX?: number;
  offsetY?: number;
}

export function ShadowFilter(props: Props) {
  const bounds = props.bounds || 1.2;
  const offsetX = props.offsetX ?? 0;
  const offsetY = props.offsetY ?? 0;
  const opacity = props.opacity ?? 1;
  return (
    <filter
      id={props.id}
      x={-(bounds - 1) / 2}
      y={-(bounds - 1) / 2}
      width={bounds}
      height={bounds}
    >
      <feGaussianBlur in="SourceAlpha" stdDeviation={props.blurRadius}/>
      <feOffset dx={offsetX} dy={offsetY} result="offsetblur"/>
      <feComponentTransfer>
        <feFuncA type="linear" slope={opacity}/>
      </feComponentTransfer>
      <feMerge> 
        <feMergeNode/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  );
} -->
