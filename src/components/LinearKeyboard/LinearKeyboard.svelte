<script lang="ts">
  import LinearKey from './LinearKey.svelte';
  import {getStore} from '../../store';
  import {setupKeyboard} from '../Keyboard/Keyboard';
  import { afterUpdate } from 'svelte';
  
  const {noteSet, tonalCenter, keyElements} = getStore();
  const pitchesInOctave = (octave: number) => $noteSet.notes.map(note => 
    note.pitchAboveTonalCenterInOctave($tonalCenter, octave)
  )

  let ref: Element;
  let destroyKeyboard = () => {};

  $: pitches = [
    ...pitchesInOctave(4),
    ...pitchesInOctave(5),
    $noteSet.notes[0].pitchAboveTonalCenterInOctave($tonalCenter, 6)
  ];

  afterUpdate(() => {
    destroyKeyboard();
    destroyKeyboard = setupKeyboard(ref, keyElements);
  });

</script>

<div class='linear-keyboard' bind:this={ref} >
  {#each pitches as pitch (pitch.slashNotation)}
    <LinearKey {pitch} />
  {/each}
</div>

<style>
  .linear-keyboard {
    height: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: flex-start;
    overflow-x: hidden;
    overflow-y: hidden;
  }
</style>