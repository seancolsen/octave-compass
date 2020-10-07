<script lang="ts">
  import { getStore } from '../../../store';
  import Tip from './Tip.svelte';
  const {editVsPlay} = getStore();
</script>

<g opacity={1 - $editVsPlay}>
  <Tip centerX={-400} centerY={-420}
    targetX={-240} targetY={-240} width={200} height={200} >
    Rotate to transpose
  </Tip>

  <Tip centerX={400} centerY={-420}
    targetX={100} targetY={-120} width={220} height={200} >
    Rotate to shift modes
  </Tip>

  <Tip centerX={-410} centerY={420}
    targetX={-410} targetY={280} width={200} height={200} >
    Click to toggle intervals
  </Tip>
</g>