<script lang="ts">
  import KeySet from './Keyboard/KeySet.svelte';
  import { pitchSet } from '../../store';
  import IntervalSetPolygon from '../common/IntervalSetPolygon.svelte';
  import { editVsPlay, keyboardRadius } from '../../store';
  import { IntervalSet } from '../../Utils/Music/IntervalSet';
  import { somethingIsRotating } from '../Wheel.svelte';
</script>

<g
  id='keyboard'
  filter="url('#shadow-when-edit')"
  class:isEdit={$editVsPlay === 0}
 >
  <IntervalSetPolygon
    radius={$keyboardRadius}
    intervalSet={IntervalSet.chromatic}
    opacity={1 - $editVsPlay}
    fill='#b7b7b7'
  />
  <KeySet
    pitchSet={$pitchSet.compliment}
    isActive={false}
  />
  <KeySet
    pitchSet={$pitchSet}
    isActive={!$somethingIsRotating}
  />
</g>

<style>
  g.isEdit :global(*) { cursor: grab; }
</style>