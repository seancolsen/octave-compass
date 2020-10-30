<script lang="ts">
  import { ChordSet } from "../../Utils/Music/ChordSet";
  import ChordChoice from './ChordChoice.svelte';
  import {getStore} from '../../store';
  import {romanNumerals} from '../../Data/romanNumerals';
  import type { Chord } from "../../Utils/Music/Chord";
  import type { Note } from "../../Utils/Music/Note";
  import Checkbox from "../common/Checkbox.svelte";
  import CheckboxTip from "./CheckboxTip.svelte";
  const {intervalSet, noteSet, tonalCenter, title, selectedChords} = getStore();

  const allChords = ChordSet.fromAllChords;

  $: notes = $noteSet.notes;

  /** 
   * Originally I though I'd want to hide empty rows, but then decided to show
   * them so that it's clearer to the user that chord types can be toggled even
   * for chords not present within the scale. I left this variable her in case
   * I'd like to alter this setting (or make it user-configurable) in the
   * future.
   */
  const showEmptyRows = true;
  
  /**
   * Test whether the given chord at the given note exists within the current
   * intervalSet.
   */
  const rowExists = (c: Chord) => $intervalSet.canContain(c.intervalSet);
  
  /**
   * Test whether the given chord at the given note exists within the current
   * intervalSet.
   */
  const cellExists = (chord: Chord, note: Note) => 
    $intervalSet.contains(chord.intervalSet.shift(note.id - $tonalCenter))

</script>


<div id='chord-selection'>

  <p>Here all the chords within the <em>{$title}</em>.</p>

  <div class='table'>
    <CheckboxTip />
    <table>
      <tr>
        <th></th>
        <th></th>
        {#each notes as note, index}
          <th class='degree'>{romanNumerals[index + 1]}</th>
        {/each}
      </tr>
      <tr>
        <th></th>
        <th></th>
        {#each notes as note}
          <th class='note-name'>{note.guaranteedName.unicode}</th>
        {/each}
      </tr>
      {#each allChords.chords as chord}
        {#if showEmptyRows || rowExists(chord)}
          <tr class:isSelected={$selectedChords.containsChord(chord)}>
            <th
              class='chord-type'
              on:click={() => selectedChords.toggle(chord)}
            >
              <div class='chord-type-label'>{chord.abbreviation}</div>
            </th>
            <th on:click={() => selectedChords.toggle(chord)}>
              <div class='indicator-selected'><Checkbox isChecked /></div>
              <div class='indicator-not-selected'><Checkbox /></div>
            </th>
            {#each notes as note}
              {#if cellExists(chord, note)}
                <td class='has-chord'><ChordChoice {chord} {note} /></td>
              {:else}
                <td></td>
              {/if}
            {/each}
          </tr>
        {/if}
      {/each}
    </table>
  </div>

  <p>More info...</p>

  <ul>
    <li>
      <div class='question'><strong>Q:</strong> Where are the ninth chords
         and other extended chords?</div>
      <div class='answer'><strong>A:</strong> This app doesn't display any extended chords
        because those chords are difficult to represent within a strictly
        octave-repeating context such as the circular keyboard.</div>
    </li>
  </ul>

</div>


<style>
  .table {
    position: relative; /* For tips positioned absolutely */
    margin-top: 1.8em;
  }
  table, tr, th, td {
    margin: 0;
    padding: 0;
  }
  table {
    border-collapse: collapse;
    table-layout:fixed;
  }
  th, td {
    min-width: 2em;
    min-height: 2em;
  }
  tr.isSelected td {
    background: white;
  }
  tr .indicator-selected {display: none; }
  tr .indicator-not-selected {display: inherit; }
  tr.isSelected .indicator-selected {display: inherit; }
  tr.isSelected .indicator-not-selected {display: none; }
  td {
    border: solid 0.1em #CCC;
    padding: 0.1em;
    overflow: hidden;
  }
  td.has-chord {
    cursor: pointer;
  }
  .degree {
    font-style: italic;
  }
  .chord-type-label {
    text-decoration: underline;
    cursor: pointer;
    text-align: right;
    min-width: max-content;
  }
  .question {
    font-style: italic;
  }
</style>