<script lang="ts">
  import { OrdinalChordSet } from '../../Utils/Music/OrdinalChordSet';
  import IntervalSetPolygon from '../common/IntervalSetPolygon.svelte';
  import SwarmOfChords from './Scale/SwarmOfChords.svelte';
  import { editVsPlay, intervalSet, selectedChords } from '../../store';

  export let rotation: number;
  export let somethingIsRotating: boolean;

  $: ordinalChordSets = OrdinalChordSet.arrayFromIntervalSet(
    $intervalSet,
    $selectedChords
  );
</script>

<g class:isEdit={$editVsPlay === 0}>
  <IntervalSetPolygon
    class='background'
    intervalSet={$intervalSet}
    radius={300}
    opacity={1 - $editVsPlay}
  />
  <SwarmOfChords
    {ordinalChordSets}
    rotation={rotation}
  />
</g>

<style>
  g > :global(.background) {
    fill: #E1E1E1;
    stroke: #f7f7f7;
    stroke-width: 3px;
    filter: url('#shadow-when-edit');
  }
  g.isEdit :global(*) { cursor: grab; }
</style>