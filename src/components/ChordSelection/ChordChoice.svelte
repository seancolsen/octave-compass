<script lang="ts">
  import type { Chord } from "../../Utils/Music/Chord";
  import ChordEmblem from '../common/ChordEmblem.svelte';
  import type { Note } from "../../Utils/Music/Note";

  export let chord: Chord;
  export let note: Note | undefined;

  const iconSize = 100;
  
  $: noteName = note?.guaranteedName.unicode;
</script>

<svg
  on:click
  viewBox={`-${iconSize / 2} -${iconSize / 2} ${iconSize} ${iconSize}`}
>
  <ChordEmblem size={iconSize / 2} {chord} {noteName} />
</svg>

<style>
  svg { display: block; width: 100%; height: 100%; }
</style>