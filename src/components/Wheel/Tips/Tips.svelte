<script lang="ts">
  import { getStore } from '../../../store';
  import Tip from './Tip.svelte';
  const {editVsPlay} = getStore();
</script>

<g opacity={1 - $editVsPlay}>
  <Tip
    text='Rotate to transpose'
    center={{x: -400, y: -420}} width={200} height={200}
    targets={[{x: -240, y: -240}]}
  />

  <Tip
    text='Rotate to shift modes'
    center={{x: 400, y: -400}} width={220} height={200}
    targets={[{x: 100, y: -120}]}
    isTargetingScale
  />

  <Tip
    text='Click to toggle intervals'
    center={{x: -410, y: 400}} width={200} height={200}
    targets={[{x: -435, y: 255}, {x: -258, y: 435}]}
  />
</g>