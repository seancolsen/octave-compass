<script lang="ts">
  import type { Chord } from "../../../Utils/Music/Chord";
  import ChordEmblem from '../../common/ChordEmblem.svelte';
  import {getStore} from '../../../store';
  import type { Note } from "../../../Utils/Music/Note";
  const {selectedChords} = getStore();

  export let chord: Chord;
  export let isSelected = false as boolean;
  export let note: Note | undefined;

  const iconSize = 100;
  
  $: noteName = note?.guaranteedName.unicode;
</script>

<div class='choice' class:isSelected
  on:click={() => selectedChords.toggle(chord)}
>
  <svg viewBox={`-${iconSize / 2} -${iconSize / 2} ${iconSize} ${iconSize}`} >
    <ChordEmblem size={iconSize / 2} {chord} {noteName} />
  </svg>
</div>

<style>
  .choice {
    margin: 0.2em;
    padding: 0.2em;
    border-radius: 0.2em;
    border: solid 0.2em transparent;
    background: none;
  }
  .choice.isSelected {background: white;}
  .choice, .choice :global(*) { cursor: pointer; }
  svg { display: block; width: 2em; margin: auto; }
</style>