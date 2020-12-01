<script lang="ts">
  import Arc from '../common/Arc.svelte';
  import { musicTheory } from '../../../Data/musicTheory';
  import { XyPoint } from '../../../Utils/Geometry/XyPoint';
  
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

<!--
  What's up with this translate 500 and then -500??
  
  It's a work-around for what appears to be a WebKit bug. I wasn't able to
  easily find anything public about this bug, but it seems like stroke only
  gets applied to text within a textPath when the letters appear in posivive
  x coordinate space. Very strange! So I draw the Arc in positive x space. Then
  move the whole group back to be in the correct position.
-->

<g {opacity}
  class={className}
  class:isHighlight
  filter={isHighlight ? "url('#blur')" : 'none'}
  transform='translate(-500, 0)'
>
  <Arc
    class='text-path-arc'
    {id}
    radius={isOnBottom ? lowerRadius : upperRadius}
    startInterval={interval + (arcSpan * (isOnBottom ? 1 : -1))}
    endInterval={interval + (arcSpan * (isOnBottom ? -1 : 1))}
    translate={new XyPoint(500, 0)}
  />
  <text class:isActive text-anchor={'middle'}>
    <textPath href={`#${id}`} startOffset={'50%'}>
      {label}
    </textPath>
  </text>
</g>

<style>
  text { font-size: 30px; fill: #777; }
  text.isActive { fill: #222;}
  g.isHighlight text { fill: white; stroke: #EEE; stroke-width: 30px; }
  g > :global(.text-path-arc) { fill: none; stroke: none; }
</style>
