<script lang="ts">
  import { IrPoint } from '../../../Utils/Geometry/IrPoint';
  import IntervalLabel from './IntervalLabel.svelte';
  import Arc from '../common/Arc.svelte';
  import SvgCheckbox from './SvgCheckbox.svelte';
  import {getStore} from '../../../store';
  const {editVsPlay, intervalSet} = getStore();

  const checkboxRadius = 430;
  const arcRadius = 430;
  const arcSpan = 0.5;

  let className: string | undefined = undefined;
  export {className as class};
  export let interval: number;
  export let label: string;
  export let isActive: boolean = true;
  export let isClickable: boolean = true;

  $: point = (new IrPoint(interval, checkboxRadius)).toXy();

  function handleClick() {
    if (isClickable) {
      intervalSet.toggleInterval(interval);
    }
  }
</script>

<g
  class={className}
  class:isClickable
  class:isActive
  on:mousedown|preventDefault|stopPropagation={handleClick}
  on:touchstart|preventDefault|stopPropagation={handleClick}
>
  <!-- Arc is to catch touches that don't fall on the label or checkbox. -->
  <Arc
    class='touch-receptor'  
    startInterval={interval - arcSpan}
    endInterval={interval + arcSpan}
    radius={arcRadius}
  />
  {#if isActive}
    <IntervalLabel {interval} {label} {isActive} isHighlight
      opacity={1 - $editVsPlay}
    />
  {/if}
  <IntervalLabel {interval} {label} {isActive} />
  <SvgCheckbox
    x={point.x}
    y={point.y}
    isChecked={isActive}
    {isClickable}
    opacity={1 - $editVsPlay}
  />
</g>

<style>
  g.isClickable :global(*) { cursor: pointer; }

  g > :global(.touch-receptor) {
    stroke-width: 130px;
    stroke: #999;
    fill: none;
    stroke-linecap: butt;
    visibility: hidden;
    pointer-events: all;
  }
</style>
