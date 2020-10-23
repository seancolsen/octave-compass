<script lang="ts">
  import { ChordSet } from "../../Utils/Music/ChordSet";
  import ChordChoice from './ChordChoice.svelte';
  import {getStore} from '../../store';
  import {romanNumerals} from '../../Data/romanNumerals';
  import type { Chord } from "../../Utils/Music/Chord";
  import type { Note } from "../../Utils/Music/Note";
  const {intervalSet, noteSet, tonalCenter} = getStore();

  const allChords = ChordSet.fromAllChords;

  $: notes = $noteSet.notes;
  
  /**
   * Test whether the given chord at the given note exists within the current
   * intervalSet.
   */
  const isValid = (chord: Chord, note: Note) => 
    $intervalSet.contains(chord.intervalSet.shift(note.id - $tonalCenter))

</script>

<div id='chord-selection'>

  <h2>Choose Chords to Display Within Scale</h2>

  <table>
    <tr>
      <th></th>
      {#each notes as note, index}
        <th>{romanNumerals[index + 1]}</th>
      {/each}
    </tr>
    <tr>
      <th></th>
      {#each notes as note}
        <th>{note.guaranteedName.unicode}</th>
      {/each}
    </tr>
    {#each allChords.chords as chord}
      <tr>
        <th>{chord.abbreviation}</th>
        {#each notes as note}
          <td>
            {#if isValid(chord, note)}
              <ChordChoice {chord} {note} />
            {/if}
          </td>
        {/each}
      </tr>
    {/each}
  </table>

</div>

<style>
  h2 {text-align: center;}
</style>