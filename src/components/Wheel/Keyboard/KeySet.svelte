<script lang="ts">
  import { NoteSet } from "../../../Utils/Music/NoteSet";
  import Key from "./Key.svelte";
  export let noteSet: NoteSet;
  export let isActive: boolean;
</script>

<g filter={isActive ? "url('#shadow-when-play')" : 'none'}>
  {#each noteSet.notes as note (note.id)}
    <Key {note} {isActive} />
  {/each}
</g>