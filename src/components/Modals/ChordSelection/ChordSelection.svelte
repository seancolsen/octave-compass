<script lang="ts">
  import { ChordSet } from "../../../Utils/Music/ChordSet";
  import ChordChoice from './ChordChoice.svelte';
  import {getStore} from '../../../store';
  const {intervalSet, selectedChords} = getStore();

  const showAll = () => selectedChords.set(ChordSet.fromAllChords);
  const showDefault = () => selectedChords.set(ChordSet.fromDefaultChords);
  
  $: defaultChordsAreSelected = $selectedChords.equals(ChordSet.fromDefaultChords);
  $: chordsInScale = ChordSet.fromContainingIntervalSet($intervalSet).chords;
</script>

<div id='chord-selection'>

  <div class='heading'>
    <h2>Chords in scale</h2>
    <div class='togglers'>
      {#if defaultChordsAreSelected}
        <span on:click={showAll}>Show all</span>
      {:else}
        <span on:click={showDefault}>Show default</span>
      {/if}
    </div>
  </div>

  <div class='chord-choices'>
    {#each chordsInScale as chord (chord.binary)}
      <ChordChoice {chord} isSelected={$selectedChords.containsChord(chord)} />
    {/each}
  </div>

</div>

<style>
  #chord-selection {overflow: scroll;}
  .heading {
    display: flex;
    align-items: baseline;
    align-content: center;
    justify-content: center;
    flex-wrap: wrap;
  }
  .heading > * { margin: 0 1vmax 0.5vmax 1vmax; }
  .togglers span {font-style: italic;}
  .chord-choices {display: flex; flex-wrap: wrap; justify-content: center;}
</style>