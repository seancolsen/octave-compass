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
  const rowExists = (c: Chord) => $intervalSet.canContain(c.intervalSet);
  
  /**
   * Test whether the given chord at the given note exists within the current
   * intervalSet.
   */
  const cellExists = (chord: Chord, note: Note) => 
    $intervalSet.contains(chord.intervalSet.shift(note.id - $tonalCenter))
  

</script>

<div id='chord-selection'>

  <p>
    All the chords within {$intervalSet.name.withArticle} are shown in the
    table below.
  </p>

  <ul>
    <li>Rows <span class='highlight'>highlighted in white</span> contain chords
      that will appear within the scale when playing or
      editing. Click the row header (e.g. <strong>Maj</strong>) to toggle the
      visibilty of all chords of that type.</li>
    <li>Click on a chord circle to hear the chord.</li>
  </ul>

  <table>
    <tr>
      <th></th>
      {#each notes as note, index}
        <th class='degree'>{romanNumerals[index + 1]}</th>
      {/each}
    </tr>
    <tr>
      <th></th>
      {#each notes as note}
        <th class='note-name'>{note.guaranteedName.unicode}</th>
      {/each}
    </tr>
    {#each allChords.chords as chord}
      {#if rowExists(chord)}
        <tr>
          <th class='chord-type'>{chord.abbreviation}</th>
          {#each notes as note}
            <td>
              {#if cellExists(chord, note)}
                <ChordChoice {chord} {note} />
              {/if}
            </td>
          {/each}
        </tr>
      {/if}
    {/each}
  </table>

  <p>More info...</p>

  <ul>
    <li>
      <div><strong>Q:</strong> Where are the "nineth" chords, and other extended
        chords?</div>
      <div><strong>A:</strong> This app doesn't display any extended chords
        because those chords are difficult to represent within a strictly
        octave-repeating context such as the wheel for playing and editing
        scales.</div>
    </li>
  </ul>

</div>


<style>
  table {
    border-collapse: collapse;
  }
  td {
    border: solid 0.1em #CCC;
  }
  .degree {
    font-style: italic;
  }
  .chord-type {
    text-decoration: underline;
    cursor: pointer;
  }
  .highlight {
    background: white;
  }
</style>