<script lang="ts">
  export let isClickable = true as boolean;
  export let isChecked = false as boolean;
  export let x = 0;
  export let y = 0;
  export let opacity = 1;

  const size = 30;
</script>

<g
  class:isChecked class:isClickable 
  transform={`translate(${x} ${y})`} {opacity} 
>
  <rect
    x={-size / 2} y={-size / 2}
    width={size} height={size}
    rx={size / 5} ry={size / 5}
  />
  <text x={1} y={10} >✔</text>
</g>

<style>
  rect { fill: #DDD; stroke: #BBB; stroke-width: 2px; }
  g.isChecked rect {  stroke: #BBB; stroke-width: 2px; }
  g.isClickable rect { stroke: #666; fill: white;}
  text {
    font-size: 28px;
    text-anchor: middle;
    fill: #777;
    visibility: hidden;
  }
  g.isChecked text {visibility: visible;}
  g.isClickable text { fill: black; }
</style>