<script lang="ts">
  import { OrdinalChordSet } from '../../../Utils/Music/OrdinalChordSet';
  import IntervalSetPolygon from '../../common/IntervalSetPolygon.svelte';
  import SwarmOfChords from './SwarmOfChords.svelte';
  import { editVsPlay, intervalSet, selectedChords } from '../../../store';

  $: ordinalChordSets = OrdinalChordSet.arrayFromIntervalSet(
    $intervalSet,
    $selectedChords
  );
</script>

<g class:isEdit={$editVsPlay === 0} id='scale'>
  <IntervalSetPolygon
    class='background'
    intervalSet={$intervalSet}
    radius={300}
    opacity={1 - $editVsPlay}
  />
  <SwarmOfChords {ordinalChordSets} />
</g>

<style>
  g > :global(.background) {
    fill: #E1E1E1;
    stroke: #f7f7f7;
    stroke-width: 3px;
    filter: url('#shadow-when-edit');
  }
</style>