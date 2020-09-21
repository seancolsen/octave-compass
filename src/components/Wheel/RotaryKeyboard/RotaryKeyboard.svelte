<script lang="ts">
  import KeySet from './KeySet.svelte';
  import IntervalSetPolygon from '../../common/IntervalSetPolygon.svelte';
  import { editVsPlay, keyboardRadius, noteSet } from '../../../store';
  import { IntervalSet } from '../../../Utils/Music/IntervalSet';
</script>

<g
  id='rotary-keyboard'
  filter="url('#shadow-when-edit')"
  class:isEdit={$editVsPlay === 0}
 >
  <IntervalSetPolygon
    class='background'
    radius={$keyboardRadius}
    intervalSet={IntervalSet.chromatic}
    opacity={1 - $editVsPlay}
    
  />
  <KeySet noteSet={$noteSet.compliment} isActive={false} />
  <KeySet noteSet={$noteSet} isActive={true} />
</g>

<style>
  g > :global(.background) {fill: #b7b7b7;}
</style>