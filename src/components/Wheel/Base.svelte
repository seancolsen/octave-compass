<script lang="ts">
  import BaseInterval from './Base/BaseInterval.svelte';
  import { musicTheory } from '../../Data/musicTheory';
  import { intervalSet } from '../../stores/intervalSet';
  import { editVsPlay } from '../../stores/editVsPlay';
  export let scaleIsRotating: boolean;
</script>

<g>
  {#each musicTheory.intervals as name, ordinal (ordinal)}
    <BaseInterval
      interval={ordinal}
      label={name}
      isActive={!scaleIsRotating && $intervalSet.isActive(ordinal)}
      isClickable={ordinal !== 0 && $editVsPlay === 0}
    />
  {/each}
</g>
