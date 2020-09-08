<script lang="ts">
  import Arc from '../common/Arc.svelte';
  import { musicTheory } from '../../../Data/musicTheory';
  
  const upperRadius = 465;
  const lowerRadius = 480;
  const arcSpan = 0.4;

  let className: string | undefined = undefined;
  export {className as class};
  export let interval: number;
  export let label: string;
  export let active: boolean;

  $: id = `interval-label-${interval}`;
  $: isOnBottom = (() => {
    const revolution = interval / musicTheory.octaveDivisions;
    return (revolution > 0.25) && (revolution < 0.75);
  })();

</script>

<g class={className}>
  <Arc
    class='text-path-arc'
    {id}
    radius={isOnBottom ? lowerRadius : upperRadius}
    startInterval={interval + (arcSpan * (isOnBottom ? 1 : -1))}
    endInterval={interval + (arcSpan * (isOnBottom ? -1 : 1))}
  />
  <text class:active text-anchor={'middle'}>
    <textPath href={`#${id}`} startOffset={'50%'}>
      {label}
    </textPath>
  </text>
</g>

<style>
  text { font-size: 30px; fill: #444; }
  text.active { fill: #DDD; }
  g > :global(.text-path-arc) {
    fill: none;
    stroke: none;
  }
</style>
