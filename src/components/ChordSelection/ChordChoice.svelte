<script lang="ts">
  import type { Chord } from "../../Utils/Music/Chord";
  import ChordEmblem from '../common/ChordEmblem.svelte';
  import {getStore} from '../../store';
  const {selectedChords} = getStore();

  export let chord: Chord;
  export let isSelected: boolean;
  const iconSize = 100;
</script>

<div class='choice' class:isSelected
  on:click={() => selectedChords.toggle(chord)}
>
  <svg viewBox={`-${iconSize / 2} -${iconSize / 2} ${iconSize} ${iconSize}`} >
    <ChordEmblem size={iconSize / 2} {chord} />
  </svg>
  <div class='chord-name'>{chord.defaultName}</div>
</div>

<style>
  .choice {
    margin: 0.4vmax;
    padding: 0.4vmax;
    border-radius: 0.4vmax;
    border: solid 0.4vmax transparent;
    background: none;
  }
  .choice.isSelected {background: white;}
  .choice, .choice :global(*) { cursor: pointer; }
  svg { display: block; width: 3.5vmax; margin: auto; }
  .choice:hover { border-color: white; }
  .choice:hover .chord-name { text-decoration: underline; }
</style>