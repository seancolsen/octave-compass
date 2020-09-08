<script lang="ts">
  const size = 30;
  export let isClickable: boolean;
  export let isChecked: boolean;
  export let x: number;
  export let y: number;
  export let opacity = 1;
</script>

<g transform={`translate(${x} ${y})`} {opacity} >
  <rect
    x={-size / 2} y={-size / 2}
    width={size} height={size}
    rx={size / 5} ry={size / 5}
    class:isChecked
    class:isClickable
  />
  {#if isChecked}
    <text
      x={1}
      y={10}
      class:isChecked
      class:isClickable
    >✔</text>
  {/if}
</g>

<style>
  rect { fill: #DDD; stroke: #BBB; stroke-width: 2px; }
  rect.isChecked { fill: white; }
  rect.isClickable { stroke: #666; }
  text { font-size: 25px; text-anchor: middle; fill: #BBB; }
  text.isClickable { fill: black; }
</style>