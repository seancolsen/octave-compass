<script lang="ts">
  import { Angle } from '../../Utils/Geometry/Angle';
  import KeySet from './Keyboard/KeySet.svelte';
  import {tonalCenter, pitchSet} from '../../store';
  import IntervalSetPolygon from '../common/IntervalSetPolygon.svelte';
  import { editVsPlay, keyboardRadius } from '../../store';
  import { IntervalSet } from '../../Utils/Music/IntervalSet';

  export let rotation: number;
  export let somethingIsRotating: boolean;
  
  $: rotation = rotation - $tonalCenter;
  $: transform = `rotate(${Angle.iToD(-$tonalCenter)})`;
</script>

<g
  transform={transform}
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
    rotation={rotation}
  />
  <KeySet
    pitchSet={$pitchSet}
    isActive={!somethingIsRotating}
    rotation={rotation}
  />
</g>

<style>
  g.isEdit :global(*) { cursor: grab; }
</style>