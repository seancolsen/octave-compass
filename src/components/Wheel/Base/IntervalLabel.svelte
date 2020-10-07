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
  export let isActive: boolean;
  export let isHighlight = false as boolean;
  export let opacity = 1;

  $: id = `interval-label-${interval}`;
  $: isOnBottom = (() => {
    const revolution = interval / musicTheory.octaveDivisions;
    return (revolution > 0.25) && (revolution < 0.75);
  })();

</script>

<g {opacity}
  class={className}
  class:isHighlight
  filter={isHighlight ? "url('#blur')" : 'none'}
>
  <Arc
    class='text-path-arc'
    {id}
    radius={isOnBottom ? lowerRadius : upperRadius}
    startInterval={interval + (arcSpan * (isOnBottom ? 1 : -1))}
    endInterval={interval + (arcSpan * (isOnBottom ? -1 : 1))}
  />
  <text class:isActive text-anchor={'middle'}>
    <textPath href={`#${id}`} startOffset={'50%'}>
      {label}
    </textPath>
  </text>
</g>

<style>
  text { font-size: 30px; fill: #999; }
  text.isActive { fill: #222;}
  g.isHighlight text { fill: white; stroke: white; stroke-width: 30px; }
  g > :global(.text-path-arc) { fill: none; stroke: none; }
</style>
