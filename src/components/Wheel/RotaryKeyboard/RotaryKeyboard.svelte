<script lang="ts">
  import KeySet from './KeySet.svelte';
  import IntervalSetPolygon from '../../common/IntervalSetPolygon.svelte';
  import { editVsPlay, keyboardRadius, noteSet } from '../../../store';
  import { IntervalSet } from '../../../Utils/Music/IntervalSet';
  import { somethingIsRotating } from '../Wheel.svelte';
</script>

<g
  id='rotary-keyboard'
  filter="url('#shadow-when-edit')"
  class:isEdit={$editVsPlay === 0}
 >
  <IntervalSetPolygon
    radius={$keyboardRadius}
    intervalSet={IntervalSet.chromatic}
    opacity={1 - $editVsPlay}
    fill='#b7b7b7'
  />
  <KeySet noteSet={$noteSet.compliment} isActive={false} />
  <KeySet noteSet={$noteSet} isActive={!$somethingIsRotating} />
</g>

<style>
  g.isEdit :global(*) { cursor: grab; }
</style>