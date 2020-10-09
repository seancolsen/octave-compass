<script lang="ts">
  import { OrdinalChordSet } from '../../../Utils/Music/OrdinalChordSet';
  import {scaleRotatorStores} from './../Wheel.svelte';
  import IntervalSetPolygon from '../../common/IntervalSetPolygon.svelte';
  import SwarmOfChords from './SwarmOfChords.svelte';
  import ModeLabels from './ModeLabels.svelte';
  import {getStore} from '../../../store';
  import { Scalar } from '../../../Utils/Math/Scalar';
  const {editVsPlay, intervalSet, selectedChords} = getStore();
  const scaleIsRotating = scaleRotatorStores.isRotating;
  const rotatorCurrentDetent = scaleRotatorStores.currentDetent;
  
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
      selectedOrdinal={Scalar.wrapToOctave(-$rotatorCurrentDetent)}
    />
  {/if}
</g>

<style>
  g > :global(.background) {
    fill: #E1E1E1;
    stroke: #f7f7f7;
    stroke-width: 3px;
    filter: url('#shadow-when-edit');
  }
</style>