<script lang="ts">
  import { PitchSet } from "../../../Utils/Music/PitchSet";
  import Key from "./Key.svelte";

  export let pitchSet: PitchSet;
  export let isActive: boolean;
  export let rotation: number;
  $: filter = isActive ? "url('#shadow-when-play')" : 'none';
</script>

<g {filter}>
  {#each pitchSet.pitches as pitch (pitch.note.id)}
    <Key
      pitch={pitch}
      rotation={rotation}
      isActive={isActive}
    />
  {/each}
</g>