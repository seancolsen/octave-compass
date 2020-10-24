<script lang="ts">
  import KeySet from './KeySet.svelte';
  import IntervalSetPolygon from '../../common/IntervalSetPolygon.svelte';
  import { IntervalSet } from '../../../Utils/Music/IntervalSet';
  import {getStore} from '../../../store';
  const {
    editVsPlay,
    keyboardRadius,
    noteSet,
    scaleIsRotating,
    somethingIsRotating,
  } = getStore();
</script>

<g
  class='rotary-keyboard'
  class:isEdit={$editVsPlay === 0}
  class:isHidden={$scaleIsRotating}
  filter="url('#shadow-when-edit')"
 >
  <IntervalSetPolygon
    class='background'
    radius={$keyboardRadius}
    intervalSet={IntervalSet.chromatic}
    opacity={1 - $editVsPlay}
  />
  <KeySet noteSet={$noteSet.compliment} isActive={false} />
  <KeySet noteSet={$noteSet} isActive={!$somethingIsRotating} />
</g>

<style>
  g > :global(.background) {fill: #CCC;}
  .isHidden {
    opacity: 0.2;
    filter: blur(3px);
  }
</style>