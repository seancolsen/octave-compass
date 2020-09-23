<script lang="ts">
  import Key from '../Keyboard/Key.svelte';
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
    <Key pitches={[pitch]}>
      <div
        class='key touch-receptor'
        class:isBlack={pitch.note.color === 'black'}
        class:isTonalCenter={pitch.note.id === $tonalCenter}
      >
        {pitch.note.name?.unicode}
        <sub>{pitch.spiOctave}</sub>
      </div>
    </Key>
  {/each}
</div>

<style>
  .keyboard {
    display: flex;
    flex-direction: row;
    overflow-x: scroll;
    height: 12vmax;
  }
  .key {
    background: white;
    border: solid 0.3vmax #999;
    width: 6vmax;
    height: 60%;
    cursor: pointer;
    text-align: center;
    font-size: 2.4vmax;
    border-radius: 0 0 1vmax 1vmax;
  }
  .key.isTonalCenter {height: 90%}
  .key.isBlack {background: black; color: white;}
</style>