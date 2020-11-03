<script lang="ts">
  import { IrPoint } from '../../../Utils/Geometry/IrPoint';
  import IntervalLabel from './IntervalLabel.svelte';
  import Arc from '../common/Arc.svelte';
  import SvgCheckbox from './SvgCheckbox.svelte';
  import {getStore} from '../../../store';
  import StandaloneKey from '../../Keyboard/StandaloneKey.svelte';
  import { Note } from '../../../Utils/Music/Note';
  import { Scalar } from '../../../Utils/Math/Scalar';
  const {editVsPlay, intervalSet, tonalCenter} = getStore();

  let className: string | undefined = undefined;
  export {className as class};
  export let interval: number;
  export let label: string;
  export let isActive: boolean = true;
  export let isClickable: boolean = true;

  $: checkboxCenter = (new IrPoint(interval, 430)).toXy();
  $: noteId = Scalar.wrapToOctave(interval + $tonalCenter);
  $: pitch = (new Note(noteId)).pitchAboveTonalCenterInOctave($tonalCenter, 4);

  function press() {
    if (!isClickable) {return;}
    intervalSet.toggleInterval(interval);
  }
</script>

<g class={className} class:isClickable class:isActive>

  {#if isActive}
    <IntervalLabel {interval} {label} {isActive} isHighlight
      opacity={1 - $editVsPlay}
    />
  {/if}
  <IntervalLabel {interval} {label} {isActive} />
  <SvgCheckbox
    x={checkboxCenter.x}
    y={checkboxCenter.y}
    isChecked={isActive}
    {isClickable}
    opacity={1 - $editVsPlay}
  />

  <StandaloneKey
    pitches={[pitch]}
    isActive={$editVsPlay === 0}
    on:press={press}
  >
    <Arc
      class='touch-receptor'  
      startInterval={interval - 0.5}
      endInterval={interval + 0.5}
      radius={450}
    />
  </StandaloneKey>

</g>

<style>
  g.isClickable :global(*) { cursor: pointer; }

  g :global(.touch-receptor) {
    stroke-width: 150px;
    stroke: #999;
    fill: none;
    stroke-linecap: butt;
    visibility: hidden;
    pointer-events: all;
  }
</style>
