<script lang="ts">
  import BaseInterval from './Base/BaseInterval.svelte';
  import { musicTheory } from '../../Data/musicTheory';
  import { scaleRotatorStores } from './Wheel.svelte';
  import {getStore} from '../../store';
  const {intervalSet, editVsPlay} = getStore();
  const scaleIsRotating = scaleRotatorStores.isRotating;
</script>

<g>
  {#each musicTheory.intervals as name, ordinal (ordinal)}
    <BaseInterval
      interval={ordinal}
      label={name}
      isActive={!$scaleIsRotating && $intervalSet.isActive(ordinal)}
      isClickable={ordinal !== 0 && $editVsPlay === 0}
    />
  {/each}
</g>
