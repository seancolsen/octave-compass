<script lang="ts">
  import { IrPoint } from '../../../Utils/Geometry/IrPoint';
  import { Angle } from '../../../Utils/Geometry/Angle';
  import { getStore } from '../../../store';

  const {keyboardRotator} = getStore();
  const {rotation} = keyboardRotator;
  const size = 60;

  export let interval: number;
  export let radius: number;
  export let color: string;
  export let isBlack = false as boolean;
  export let hasBackground = true as boolean;
  export let isParenthetical: boolean = false;
  export let strokeWidth: number | undefined = undefined;
  export let lightIsOn = false as boolean;

  $: point = (new IrPoint(interval, radius)).toXy();
  $: rotationDeg = -Angle.iToD($rotation);
  $: transform = `translate(${point.x} ${point.y}) rotate(${rotationDeg})`;
</script>


<g
  class:isParenthetical
  class:isBlack
  class:lightIsOn 
  class:hasBackground
  transform={transform}
>
  {#if hasBackground}
    <rect
      x={-size/2} y={-size/2}
      width={size} height={size}
      rx={size/6}  ry={size/6}
      fill={color}
      stroke={strokeWidth ? color : 'none'}
      stroke-width={strokeWidth}
    />
  {/if}
  <text
    x={1}
    y={4}
    dominant-baseline={'middle'}
    text-anchor={'middle'}
  >
    {#if isParenthetical}({/if}
      <slot />
    {#if isParenthetical}){/if}
  </text>
</g>

<style>
  g > :global(text) {
    font-size: 42px;
    font-weight: bold;
    fill: black;
    stroke: none;
  }
  g.isParenthetical > :global(text) { font-size: 34px; font-weight: normal; }
  g.isBlack > :global(text) { fill: white; }
  g.lightIsOn > :global(text) { fill: black; }
  g.isBlack.lightIsOn.hasBackground > :global(text) { fill: white; }
</style>
