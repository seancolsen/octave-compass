<script lang="ts">
  import { OrdinalChordSet } from '../../../Utils/Music/OrdinalChordSet';
  import IntervalSetPolygon from '../../common/IntervalSetPolygon.svelte';
  import SwarmOfChords from './SwarmOfChords.svelte';
  import ModeLabels from './ModeLabels.svelte';
  import {getStore} from '../../../store';
  import { Scalar } from '../../../Utils/Math/Scalar';
  const {
    editVsPlay,
    intervalSet,
    selectedChords,
    scaleRotator,
    scaleIsRotating,
  } = getStore();
  const {currentDetent} = scaleRotator;
  
  $: ordinalChordSets = OrdinalChordSet.arrayFromIntervalSet(
    $intervalSet,
    $selectedChords
  );
</script>

<g class:isEdit={$editVsPlay === 0} class='scale-component'>
  <IntervalSetPolygon
    class='background'
    intervalSet={$intervalSet}
    radius={300}
    opacity={1 - $editVsPlay}
  />
  <SwarmOfChords {ordinalChordSets} />
  {#if $scaleIsRotating}
    <ModeLabels
      intervalSet={$intervalSet}
      selectedOrdinal={Scalar.wrapToOctave(-$currentDetent)}
    />
  {/if}
</g>

<style>
  g > :global(.background) {
    fill: #EEE;
    stroke: white;
    stroke-width: 3px;
    filter: url('#shadow-when-edit');
  }
</style>