<script lang="ts">
  import { IrPoint } from '../../../Utils/Geometry/IrPoint';
  import IntervalLabel from './IntervalLabel.svelte';
  import Arc from '../common/Arc.svelte';
  import SvgCheckbox from './SvgCheckbox.svelte';
  import {getStore} from '../../../store';
  import {lateralExtensionFactor} from '../RotaryKeyboard/KeyPolygon.svelte';
  const {editVsPlay, intervalSet} = getStore();

  const checkboxRadius = 430;
  const arcRadius = 430;
  const arcSpan = 0.5 * lateralExtensionFactor;

  let className: string | undefined = undefined;
  export {className as class};
  export let interval: number;
  export let label: string;
  export let isActive: boolean = true;
  export let isClickable: boolean = true;

  $: point = (new IrPoint(interval, checkboxRadius)).toXy();

</script>

<g
  class={className}
  class:isClickable
  class:isActive
  on:click={() => isClickable ? intervalSet.toggleInterval(interval) : null}
>
  <Arc
    class='background'  
    startInterval={interval - arcSpan}
    endInterval={interval + arcSpan}
    radius={arcRadius}
  />
  <IntervalLabel {interval} {label} active={isActive} />
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
  g.isClickable:hover { text-decoration: underline; }
  g > :global(.background) {
    stroke-width: 130px;
    stroke: #666666;
    fill: none;
    stroke-linecap: butt;
  }
  g.isActive > :global(.background) { stroke: #787878; }
</style>
