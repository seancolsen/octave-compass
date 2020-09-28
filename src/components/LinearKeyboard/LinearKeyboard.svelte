<script lang="ts">
  import LinearKey from './LinearKey.svelte';
  import {getStore} from '../../store';
  const {noteSet, tonalCenter} = getStore();
  const pitchesInOctave = (octave: number) => $noteSet.notes.map(note => 
    note.pitchAboveTonalCenterInOctave($tonalCenter, octave)
  )
  $: pitches = [
    ...pitchesInOctave(4),
    ...pitchesInOctave(5),
    $noteSet.notes[0].pitchAboveTonalCenterInOctave($tonalCenter, 6)
  ];
</script>

<div class='keyboard'>
  {#each pitches as pitch}
    <LinearKey {pitch} />
  {/each}
</div>

<style>
  .keyboard {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: flex-start;
    overflow-x: scroll;
    overflow-y: hidden;
    height: 17vmax;
    /* background: #BBB; */
  }
</style>